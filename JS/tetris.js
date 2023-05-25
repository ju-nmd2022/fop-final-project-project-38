const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
let backgroundImage;
let gameModel;
let score = 0;
let level = 1;
let scoreboard;
let frameCounter = 0;
const frameRateInterval = 30;
const tetrominoes = [
  [],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  // Rest of the tetromino shapes
];

const COLORS = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#10FF01',
  '#F000FF'
];

function preload() {
  backgroundImage = loadImage("../IMG/Level1.jpg");
}

function setup() {
  const canvas = createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  canvas.parent('canvas-container');
  gameModel = new GameModel();
  scoreboard = document.getElementById("scoreboard");
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

  gameModel.renderGameState();

  // Update the game state
  frameCounter++;
  if (frameCounter >= frameRateInterval - level * 2) {
    gameModel.moveDown();
    frameCounter = 0;
  }
  checkGrid();
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
  if (count == 1) {
    score += 10;
  } else if (count == 2) {
    score += 30;
  } else if (count == 3) {
    score += 50;
  } else if (count > 3) {
    score += 100;
  }
  if (score >= level * 200) {
    level++;
  }
  scoreboard.innerHTML = "Score: " + score + " | Level: " + level;
}

class GameModel {
  constructor() {
    this.fallingPiece = null;
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
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let cell = this.grid[i][j];
        if (cell > 0) {
          fill(COLORS[cell]);
          rect(
            j * BLOCK_SIZE,
            i * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }

    if (this.fallingPiece !== null) {
      this.fallingPiece.renderPiece();
    }
  }

  moveDown() {
    if (this.fallingPiece === null) {
      this.renderGameState();
      return;
    } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
      const shape = this.fallingPiece.shape;
      const x = this.fallingPiece.x;
      const y = this.fallingPiece.y;
      shape.forEach((row, i) => {
        row.forEach((cell, j) => {
          let p = x + j;
          let q = y + i;
          if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
            this.grid[q][p] = shape[i][j];
          }
        });
      });

      this.fallingPiece = null;
      this.clearRows();
      if (this.checkGameOver()) {
        alert("Game over!");
        this.grid = this.makeStartingGrid();
        score = 0;
        level = 1;
      }
    } else {
      this.fallingPiece.y += 1;
    }
    this.renderGameState();
  }

  moveLeft() {
    if (this.fallingPiece === null) {
      return;
    }

    let x = this.fallingPiece.x;
    let y = this.fallingPiece.y;
    if (!this.collision(x - 1, y)) {
      this.fallingPiece.x -= 1;
    }
    this.renderGameState();
  }

  moveRight() {
    if (this.fallingPiece === null) {
      return;
    }

    let x = this.fallingPiece.x;
    let y = this.fallingPiece.y;
    if (!this.collision(x + 1, y)) {
      this.fallingPiece.x += 1;
    }
    this.renderGameState();
  }

  rotate() {
    if (this.fallingPiece !== null) {
      let shape = [...this.fallingPiece.shape.map((row) => [...row])];
      const n = shape.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
          [shape[i][j], shape[j][i]] = [shape[j][i], shape[i][j]];
        }
      }
      shape.forEach((row) => row.reverse());

      if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
        this.fallingPiece.shape = shape;
      }
    }
    this.renderGameState();
  }

  clearRows() {
    let rowsCleared = 0;
    for (let i = ROWS - 1; i >= 0; i--) {
      if (this.grid[i].every((cell) => cell !== 0)) {
        this.grid.splice(i, 1);
        this.grid.unshift(new Array(COLS).fill(0));
        rowsCleared++;
      }
    }
    if (rowsCleared === 1) {
      score += 10;
    } else if (rowsCleared === 2) {
      score += 30;
    } else if (rowsCleared === 3) {
      score += 50;
    } else if (rowsCleared > 3) {
      score += 100;
    }
    if (score >= level * 200) {
      level++;
    }
    scoreboard.innerHTML = "Score: " + score + " | Level: " + level;
  }

  checkGameOver() {
    for (let i = 0; i < COLS; i++) {
      if (this.grid[0][i] !== 0) {
        return true;
      }
    }
    return false;
  }
}

class Tetromino {
  constructor(shape, x, y) {
    this.shape = shape;
    this.x = x;
    this.y = y;
  }

  renderPiece() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] > 0) {
          fill(COLORS[this.shape[i][j]]);
          rect(
            (this.x + j) * BLOCK_SIZE,
            (this.y + i) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  }
}

function spawnTetromino() {
  const randomIndex = Math.floor(Math.random() * tetrominoes.length);
  const shape = tetrominoes[randomIndex];
  const x = Math.floor((COLS - shape[0].length) / 2);
  const y = 0;
  gameModel.fallingPiece = new Tetromino(shape, x, y);
}

spawnTetromino();
