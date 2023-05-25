const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;
let backgroundImage;
let gameModel;
let score = 0;
let level = 1;
let scoreboard;
let frameCounter = 0;
const frameRateInterval = 30;
const tetrominoes = [
  [[1, 1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]]
];

const COLORS = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#10FF01",
  "#F000FF"
];

function preload() {
  backgroundImage = loadImage("../IMG/Level1.jpg");
}

function setup() {
  const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  canvas.parent("canvas-container");
  gameModel = new GameModel();
  scoreboard = document.getElementById("scoreboard");
}

function draw() {
  background(backgroundImage);
  gameModel.renderGameState();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    gameModel.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    gameModel.moveRight();
  } else if (keyCode === DOWN_ARROW) {
    gameModel.moveDown();
  } else if (keyCode === UP_ARROW) {
    gameModel.rotate();
  }
}

class GameModel {
  constructor() {
    this.fallingPiece = this.spawnTetromino();
    this.grid = this.makeStartingGrid();
  }

  makeStartingGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
      grid.push(new Array(COLS).fill(0));
    }
    return grid;
  }

  collision(x, y, candidate = null) {
    const shape = candidate || this.fallingPiece.shape;
    const n = shape.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (shape[i][j] > 0) {
          let p = x + j;
          let q = y + i;
          if (p >= 0 && p < COLS && q < ROWS) {
            // in bounds
            if (this.grid[q][p] > 0) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  renderGameState() {
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i <= COLS; i++) {
      line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, height);
    }
    for (let i = 0; i <= ROWS; i++) {
      line(0, i * BLOCK_SIZE, width, i * BLOCK_SIZE);
    }

    for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const cell = this.grid[i][j];
          if (cell !== 0) {
            const colorIndex = cell - 1; 
            fill(COLORS[colorIndex]);
            rect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
      
      const { x, y, shape } = this.fallingPiece;
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j] > 0) {
            const colorIndex = shape[i][j] - 1; 
            fill(COLORS[colorIndex]); 
            rect((x + j) * BLOCK_SIZE, (y + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
      

    // Update the scoreboard
    scoreboard.innerText = `Score: ${score} | Level: ${level}`;
  }

  rotate() {
    let rotated = [];
    const n = this.fallingPiece.shape.length;
    for (let i = 0; i < n; i++) {
      rotated.push(new Array(n).fill(0));
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[i][j] = this.fallingPiece.shape[n - j - 1][i];
      }
    }
    if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, rotated)) {
      this.fallingPiece.shape = rotated;
    }
  }

  moveLeft() {
    if (!this.collision(this.fallingPiece.x - 1, this.fallingPiece.y)) {
      this.fallingPiece.x--;
    }
  }

  moveRight() {
    if (!this.collision(this.fallingPiece.x + 1, this.fallingPiece.y)) {
      this.fallingPiece.x++;
    }
  }

  moveDown() {
    if (!this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
      this.fallingPiece.y++;
    } else {
      this.lockPiece();
      this.clearRows();
      this.fallingPiece = this.spawnTetromino();
    }
  }

  lockPiece() {
    const { x, y, shape } = this.fallingPiece;
    const n = shape.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (shape[i][j] > 0) {
          this.grid[y + i][x + j] = shape[i][j];
        }
      }
    }
  }

  clearRows() {
    let fullRows = [];
    for (let i = 0; i < ROWS; i++) {
      if (this.grid[i].every(cell => cell > 0)) {
        fullRows.push(i);
      }
    }

    for (let row of fullRows) {
      this.grid.splice(row, 1);
      this.grid.unshift(new Array(COLS).fill(0));
    }

    // Update score and level
    const numRowsCleared = fullRows.length;
    if (numRowsCleared > 0) {
      score += 10 * numRowsCleared;
      level = Math.floor(score / 100) + 1;
    }
  }

  spawnTetromino() {
    const index = Math.floor(random(tetrominoes.length));
    const shape = tetrominoes[index];
    const x = Math.floor(COLS / 2) - Math.floor(shape.length / 2);
    const y = 0;
    return new Tetromino(shape, x, y);
  }
}

class Tetromino {
  constructor(shape, x, y) {
    this.shape = shape;
    this.x = x;
    this.y = y;
  }
}


function startGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.style.display = "block";
  const startButton = document.getElementById("start-button");
  startButton.style.display = "none";
  loop();
}

function initializeGame() {
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);
}

function initialize() {
  setup();
  initializeGame();
}

function preload() {
  loadImage("../IMG/Level1.jpg", initialize);
}

initialize();
