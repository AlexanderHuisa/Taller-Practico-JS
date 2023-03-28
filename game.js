const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

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
function setCanvasSize(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;
    startGame();
}

function startGame(){
    game.font = elementsSize + 'px Verdana';
    //game.textAlign = 'left';
    
    const map = maps[level];
    if (!map){
        gameWin();
    }
    const mapRows = map.trim().split('\n');  //trim quita espacios en blanco de un string, split separa 
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0, canvasSize,canvasSize);
    enemyPositions = [];

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
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        console.log("perdiste todas tus vidas,  juego iniciado nuevamente");
        startGame();
    }
    
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveByKeys(event){
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
}

function moveUp(){
    if ((playerPosition.y - elementsSize) < elementsSize){
        console.log("OUT");
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
    if ((playerPosition.x - elementsSize) < elementsSize - elementsSize){
        console.log("OUT");
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