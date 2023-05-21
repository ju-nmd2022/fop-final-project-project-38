let level = 1;
let score = 0;
//grid
const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;

function setup() {
    const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    canvas.parent('canvas-container');
    
}

function draw() {
    background(255);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= COLS; i++) {
	    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
	    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
    }
}

// Display score
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
textAlign(RIGHT, TOP);
ctx.font = '24px Arial';
ctx.strokeRect(300, 107, 161, 24);
ctx.fillText("SCORE", 300, 200);
displayTetramino(nextTetramino, COLS + 2, 10);
