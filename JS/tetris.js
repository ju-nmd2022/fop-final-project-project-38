import Tetromino from "./tetromino.js";

let level = 1;
let score = 0;
let tetrominoes = [];
let backgroundImage;

function preload() {
  backgroundImage = loadImage("../Level1.jpg");
}

//grid
const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;

function setup() {
    const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    canvas.parent('canvas-container');
}

function draw() {
    background(backgroundImage);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= COLS; i++) {
	    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
	    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
    }
}

