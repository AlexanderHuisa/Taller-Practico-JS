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
    const map = maps[1];
    const mapRows = map.trim().split('\n');  //trim quita espacios en blanco de un string, split separa 
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0,0, canvasSize,canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (rowIndex);
            const posY = elementsSize * (colIndex + 1);
            game.fillText(emoji,posX, posY)

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log (playerPosition);
                }
                
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
    game.fillText(emojis.PLAYER,playerPosition.x,playerPosition.y);
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