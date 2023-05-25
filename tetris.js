let grid;
let currentPiece;
let score = 0;
let music;
let gameOverFlag = false;
const GRID_SIZE = 30;
const COLS = 18;
const ROWS = 28;
const FRAME_RATE = 10;
let backgroundImage;
let tetrominoImage;

function preload() {
    backgroundImage = loadImage("./Level1.jpg");
    tetrominoImage = loadImage("./Asset 9.png");
    music = document.getElementById('music');
    music.play();
  }

function setup() {
  createCanvas(COLS * GRID_SIZE, ROWS * GRID_SIZE);
  grid = createGrid();
  currentPiece = createPiece();
  frameRate(FRAME_RATE);
  backgroundImage.resize(COLS * GRID_SIZE, ROWS * GRID_SIZE); 
  music.play();
}

function draw() {
  background(220);
  drawBackgroundImage();
  updateGame();
  drawGrid();
  drawPiece(currentPiece);
  drawScore();
  if (gameOverFlag) {
    gameOver();
  }
}
function drawBackgroundImage() {
    image(backgroundImage, 0, 0);
}
function drawScore() {
    const x = width - 10;
    const y = 10;
    textAlign(RIGHT, TOP);
    fill(255);
    textSize(24);
    text("Score: " + score, x, y);
  }
  function gameOver() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Game Over", width / 2, height / 2);
  }
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    movePiece(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    movePiece(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    movePiece(0, 1);
  } else if (keyCode === UP_ARROW) {
    rotatePiece();
  }
}

function updateGame() {
    if (frameCount % (60 / FRAME_RATE) === 0) {
      if (!gameOverFlag) {
        if (canMove(0, 1)) {
          movePiece(0, 1);
        } else {
          placePiece();
          checkRows();
          currentPiece = createPiece();
  
          if (!canMove(0, 0)) {
            gameOverFlag = true;
          }
        }
      }
    }
  }

function createGrid() {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < COLS; col++) {
      grid[row][col] = 0;
    }
  }
  return grid;
}

function createPiece() {
  const pieces = [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1, 1, 1],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
  ];

  const index = floor(random(pieces.length));
  const piece = pieces[index];
  const col = floor(COLS / 2 - piece[0].length / 2);
  const row = 0;
  return {
    piece: piece,
    col: col,
    row: row,
  };
}

function drawGrid() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!grid[row][col]) {
          continue;
        }
        if (typeof grid[row][col] === 'object') {
          image(
            grid[row][col],
            col * GRID_SIZE,
            row * GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE
          );
        } else {
          fill(0);
          stroke(255);
          rect(col * GRID_SIZE, row * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }
    }
  }
  

function drawPiece(piece) {
    for (let row = 0; row < piece.piece.length; row++) {
      for (let col = 0; col < piece.piece[row].length; col++) {
        if (piece.piece[row][col]) {
          image(
            tetrominoImage,
            (piece.col + col) * GRID_SIZE,
            (piece.row + row) * GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE
          );
        }
      }
    }
  }
  

function canMove(moveX, moveY) {
  for (let row = 0; row < currentPiece.piece.length; row++) {
    for (let col = 0; col < currentPiece.piece[row].length; col++) {
      if (currentPiece.piece[row][col]) {
        const newX = currentPiece.col + col + moveX;
        const newY = currentPiece.row + row + moveY;
        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          grid[newY][newX]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function movePiece(moveX, moveY) {
  if (canMove(moveX, moveY)) {
    currentPiece.col += moveX;
    currentPiece.row += moveY;
  }
}

function rotatePiece() {
  const newPiece = [];
  for (let col = 0; col < currentPiece.piece[0].length; col++) {
    newPiece[col] = [];
    for (let row = 0; row < currentPiece.piece.length; row++) {
      newPiece[col][row] = currentPiece.piece[currentPiece.piece.length - 1 - row][col];
    }
  }
  if (canRotate(newPiece)) {
    currentPiece.piece = newPiece;
  }
}

function canRotate(newPiece) {
  for (let row = 0; row < newPiece.length; row++) {
    for (let col = 0; col < newPiece[row].length; col++) {
      if (newPiece[row][col]) {
        const newX = currentPiece.col + col;
        const newY = currentPiece.row + row;
        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          grid[newY][newX]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function placePiece() {
    for (let row = 0; row < currentPiece.piece.length; row++) {
      for (let col = 0; col < currentPiece.piece[row].length; col++) {
        if (currentPiece.piece[row][col]) {
          grid[currentPiece.row + row][currentPiece.col + col] = tetrominoImage;
        }
      }
    }
  }

function checkRows() {
  for (let row = ROWS - 1; row >= 0; row--) {
    let isRowFull = true;
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0) {
        isRowFull = false;
        break;
      }
    }
    if (isRowFull) {
      score++;
      for (let r = row; r > 0; r--) {
        for (let col = 0; col < COLS; col++) {
          grid[r][col] = grid[r - 1][col];
        }
      }
      for (let col = 0; col < COLS; col++) {
        grid[0][col] = 0;
      }
    }
  }
}
