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
    
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (rowIndex);
            const posY = elementsSize * (colIndex + 1);
            game.fillText(emoji,posX, posY)
        })
    });


    // for(let i = 0; i < 10;i++){
    //     for(let j = 1; j <= 10; j++){
    //         game.fillText(emojis[mapRowCols[j-1][i]],elementsSize * i,elementsSize * j);
    //     }
    // }
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
    console.log("Me quiero mover hacia arriba");
}

function moveDown(){
    console.log("Me quiero mover hacia abajo");
}

function moveLeft(){
    console.log("Me quiero mover hacia la izquierda");
}

function moveRight(){
    console.log("Me quiero mover hacia derecha");
}