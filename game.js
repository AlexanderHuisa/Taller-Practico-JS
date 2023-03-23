const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');


window.addEventListener('load', startGame);  //carga la funcion del juego una vez carga todo el html, esto para evitar futuros problemas con canvas

function startGame(){
    //game.fillRect(0,0,100,100);
    //game.clearRect(50,50,50,50);
    
    game.font='25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'left';
    game.fillText('Hola', 25, 25);
    
}