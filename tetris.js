//grid
const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 20;

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
fill(0);
textAlign(RIGHT, TOP);
textSize(24);
text(`Score: ${score}`, width - 180, 40);
text(`Level: ${level}`, width - 180, 80);
text('Next Tetramino:', width - 180, 120);
displayTetramino(nextTetramino, COLS + 2, 10);
