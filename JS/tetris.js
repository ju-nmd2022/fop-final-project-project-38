import Tetromino from "./tetromino";

let level = 1;
let score = 0;
let tetrominoes = [];
//grid
const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;

function setup() {
    const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    canvas.parent('canvas-container');
    
}

function draw() {
    background('../Level1.jpg');
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= COLS; i++) {
	    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
	    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
    }
}

