import Tetromino from "./tetromino.js";

let level = 1;
let score = 0;
let tetrominoes = [];
let backgroundImage;

//grid
const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;

let currentTetromino; 

function preload() {
  backgroundImage = loadImage("../Level1.jpg");
}

function setup() {
  const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  canvas.parent('canvas-container');

  backgroundImage.resize(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  imageMode(CENTER);

  currentTetromino = new Tetromino();
}

function draw() {
  background(0);
  image(backgroundImage, 0, 0);
  stroke(0);
  strokeWeight(1);

  for (let i = 0; i <= COLS; i++) {
    line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
  }
  for (let i = 0; i <= ROWS; i++) {
    line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
  }

  currentTetromino.update();
  currentTetromino.display();
}
