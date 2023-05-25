const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;
let backgroundImage;
let tetromino;
let frameRateInterval = 30;
let frameCounter = 0;
let tetrominoes = [];
let scoreboard = document.querySelector("h2");
let score = 0;


function preload() {
  backgroundImage = loadImage("../IMG/Level1.jpg");

  shapeImages = {
    [[[1, 1, 1, 1]]]: loadImage("../IMG/shape1.png"),
    [[[1, 1], [1, 1]]]: loadImage("../IMG/shape2.png"),
    [[[1, 1, 1], [0, 1, 0]]]: loadImage("../IMG/shape3.png"),
    [[[1, 1, 0], [0, 1, 1]]]: loadImage("../IMG/shape4.png"),
    [[[0, 1, 1], [1, 1, 0]]]: loadImage("../IMG/shape5.png"),
    [[[1, 1, 1], [1, 0, 0]]]: loadImage("../IMG/shape6.png"),
    [[[1, 1, 1], [0, 0, 1]]]: loadImage("../IMG/shape7.png"),
  };
}

function setup() {
  const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  canvas.parent('canvas-container');
  const tetrominoes = [];
  for (let i = 0; i < ROWS; i++) {
    tetrominoes.push(new Array(COLS).fill(0));
  }

  tetromino = new Tetromino(tetrominoes);
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

  tetromino.show();

  // Update the tetromino position
  frameCounter++;
  if (frameCounter >= frameRateInterval) {
    tetromino.moveDown();
    frameCounter = 0;
  }
  checkGrid();
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

function initGame() {
}

function startGame() {
  initGame();
  setup();
  setInterval(updateGame, 1000);
}
function checkGrid() {
    let count = 0;
    for (let i = 0; i < tetrominoes.length; i++) {
      let allFilled = true;
      for (let j = 0; j < tetrominoes[0].length; j++) {
        if (tetrominoes[i][j] == 0) {
          allFilled = false;
        }
      }
      if (allFilled) {
        count++;
        tetrominoes.splice(i, 1);
        tetrominoes.unshift(new Array(COLS).fill(0));
      }
    }
    if(count == 1){
        score+=10;
    }else if(count == 2){
        score+=30;
    }else if(count == 3){
        score+=50;
    }else if(count>3){
        score+=100
    }
    scoreboard.innerHTML = "Score: " + score;
  }
startGame();