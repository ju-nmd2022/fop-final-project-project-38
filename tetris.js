window.onload = function() {
    setup();
};

//grid
const ROWS = 20;
const COLS = 10;
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