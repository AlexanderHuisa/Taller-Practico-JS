const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTimes = document.querySelector('#times');
const spanTiempoRecord = document.querySelector('#tRecord');
const btnReloadGame = document.querySelector('#rGame')

window.addEventListener('load', setCanvasSize);  //carga la funcion del juego una vez carga todo el html, esto para evitar futuros problemas con canvas
window.addEventListener('resize', setCanvasSize); // carga la pagina una vez cambia de tamaño el tamaño de la pantalla

let elementsSize;
let canvasSize;
let playerPosition = {
    x:undefined,
    y:undefined
}
let giftPosition = {
    x:undefined,
    y:undefined
}
let enemyPositions = [];
let level = 0;
let lives = 3;
let timeStart; 
let timePlayer = 0;
let timeInterval;
let record;

let timeMinut = 0;

function setCanvasSize(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    canvasSize = Number(canvasSize.toFixed(3));

    elementsSize = (canvasSize / 10) - 1;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame(){
    showTime();
    game.font = elementsSize + 'px Verdana';
    //game.textAlign = 'end';
    
    const map = maps[level];
    if (!map){
        gameWin();
    }

    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100);
    }
    showRecord();
    const mapRows = map.trim().split('\n');  //trim quita espacios en blanco de un string, split separa 
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0, canvasSize,canvasSize);
    enemyPositions = [];
    showLives();
    
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji,posX, posY)

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log (playerPosition);
                }
                
            }else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
                //console.log(mapRowCols); 
            }else if(col == 'X'){
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
                
                //console.log(enemiesPositions);
            }
        })
    });
    movePlayer();


    // for(let i = 0; i < 10;i++){
    //     for(let j = 1; j <= 10; j++){
    //         game.fillText(emojis[mapRowCols[j-1][i]],elementsSize * i,elementsSize * j);
    //     }
    // }
}
function movePlayer(){
    const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3); //tofixed para limitar los descimales de un float a 3
    const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColision = giftColisionX && giftColisionY;
    if (giftColision) {
        levelWin();
        console.log('pasaste de nivel');
        return;
    }
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    })

    if(enemyCollision){
        levelFail();
    }


    game.fillText(emojis.PLAYER,playerPosition.x,playerPosition.y);
}

function levelWin(){
    console.log("Subir nivel")
    level++;
    startGame();
}

function gameWin(){
    console.log("Ganaste todos los niveles");
    clearInterval(timeInterval); //finaliza el intervalo del tiempo transcurrido en el juego
    const recordTime = localStorage.getItem('record_time');
    if (recordTime){
        if (recordTime > timePlayer){
            localStorage.setItem('record_time',timePlayer);
            pResult.innerHTML = 'Superaste el record';
        }else{
            pResult.innerHTML = 'lo siento no Superaste el record';
        }
    }else{
        localStorage.setItem('record_time', timePlayer);
        pResult.innerHTML = 'Primera vez? Muy bien, ahora trata de superar el juego';
    }
    console.log({recordTime})
}

function levelFail(){
    
    if (lives > 0){
        console.log("Chocaste con un enemigo, ¡perdiste!");
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        lives--;
        console.log("vidas total: " + lives);
        startGame();
    }else{
        level = 0;
        lives = 3;
        timeStart = undefined;
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        console.log("perdiste todas tus vidas,  juego iniciado nuevamente");
        startGame();
    }
    
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']) // crea un array con la cantidad que tenga la variable
    spanLives.innerHTML = heartsArray.join(''); //.join quita las comas que aparece cuando imprimes el array
}
function showTime(){
    // let timeSecond =Math.trunc((Date.now() - timeStart) / 1000);
    // if (timeSecond == 60) {
    //     timeMinut++; 
    //     timeStart = Date.now();
    // }
    timePlayer = Date.now()- timeStart;//timeMinut+ " : " + timeSecond;
    spanTimes.innerHTML = timePlayer;//timeMinut+ " : " + timeSecond;
}

function showRecord(){
    if(!localStorage.getItem('record_time')){
        spanTiempoRecord.innerHTML = 'Aun no hay un record';
    }else{
        spanTiempoRecord.innerHTML = localStorage.getItem('record_time');
    }
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnReloadGame.addEventListener('click', reloadAllGame);

function moveByKeys(event){
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
}
function moveUp(){
    if ((playerPosition.y - elementsSize) < elementsSize - 1){
        console.log("OUT");
        console.log("X",playerPosition.x,"to",playerPosition.x.toFixed(3), "Y",playerPosition.y,"tamaño de elemento", elementsSize)
    }else{
        console.log("Me quiero mover hacia arriba");
        playerPosition.y -= elementsSize;
        startGame();    
    }
    
}
function moveDown(){
    if ((playerPosition.y + elementsSize) > canvasSize){
        console.log("OUT");
    }else{
        console.log("Me quiero mover hacia abajo");
        playerPosition.y += elementsSize;
        startGame();
    }
}  
function moveLeft(){
    if ((playerPosition.x) < elementsSize - 1){
        console.log("OUT");
        console.log("X",playerPosition.x,"to",playerPosition.x.toFixed(1), "Y",playerPosition.y,"tamaño de elemento", elementsSize)
    }else{
        console.log("Me quiero mover hacia la izquierda");
        
        playerPosition.x -= elementsSize;
        startGame();    
    }
    
}
function moveRight(){
    if ((playerPosition.x + elementsSize) > (canvasSize - elementsSize)){
        console.log("OUT");
    }else{
        console.log("Me quiero mover hacia derecha");
        playerPosition.x += elementsSize;
        startGame();    
    }
    
}
function reloadAllGame(){
    window.location.reload();
}