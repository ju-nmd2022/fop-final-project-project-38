const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;
let tetrominoes = [];
let backgroundImage;

function preload() {
    backgroundImage = loadImage("../Level1.jpg");
  }

function setup() {
    const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    canvas.parent('canvas-container');
}

function draw() {
    background(255);
    image(backgroundImage, 0, 0);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= COLS; i++) {
	    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
	    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
    }
}