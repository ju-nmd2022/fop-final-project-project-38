const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;
let tetrominoes = [];
let backgroundImage;
let canvasContext;
let tetromino;

function preload() {
    backgroundImage = loadImage("../IMG/Level1.jpg");
}

function setup() {
    const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    canvas.parent('canvas-container');
    canvasContext = canvas.canvas.getContext('2d');
    tetromino = new Tetromino();
}

function draw() {
    background(255);
    image(backgroundImage, 0, 0);
    stroke(0);
    strokeWeight(1);
    canvasContext.beginPath();
    for (let i = 0; i <= COLS; i++) {
        canvasContext.moveTo(i * BLOCK_SIZE, 0);
        canvasContext.lineTo(i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
        canvasContext.moveTo(0, i * BLOCK_SIZE);
        canvasContext.lineTo(width, i * BLOCK_SIZE);
    }
    canvasContext.stroke();

    tetromino.show();
    tetromino.update();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        tetromino.moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
        tetromino.moveRight();
    } else if (keyCode === DOWN_ARROW) {
        tetromino.moveDown();
    } else if (keyCode === UP_ARROW) {
        tetromino.rotate();
    }
}

function updateGame() {
   
}

// Initialize the game
function initGame() {
    
}

function startGame() {
    initGame();
    setup();
    setInterval(updateGame, 1000);
}

startGame();
