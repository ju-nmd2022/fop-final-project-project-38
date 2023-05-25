const ROWS = 30;
const COLS = 15;
const BLOCK_SIZE = 30;
let backgroundImage;
let gameModel;
let score = 0;
let scoreboard;

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
  if (frameCounter >= frameRateInterval) {
    gameModel.moveDown();
    frameCounter = 0;
  }
  checkGrid();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    gameModel.move(false);
  } else if (keyCode === RIGHT_ARROW) {
    gameModel.move(true);
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
  scoreboard.innerHTML = "Score: " + score;
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
        fill(COLORS[cell]);
        rect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }

    if (this.fallingPiece !== null) {
      this.fallingPiece.show();
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

      // check game over
      if (this.fallingPiece.y === 0) {
        alert("Game over!");
        this.grid = this.makeStartingGrid();
      }
      this.fallingPiece = null;
    } else {
      this.fallingPiece.y += 1;
    }
    this.renderGameState();
  }

  move(right) {
    if (this.fallingPiece === null) {
      return;
    }

    let x = this.fallingPiece.x;
    let y = this.fallingPiece.y;
    if (right) {
      // move right
      if (!this.collision(x + 1, y)) {
        this.fallingPiece.x += 1;
      }
    } else {
      // move left
      if (!this.collision(x - 1, y)) {
        this.fallingPiece.x -= 1;
      }
    }
    this.renderGameState();
  }

  rotate() {
    if (this.fallingPiece !== null) {
      let shape = [...this.fallingPiece.shape.map((row) => [...row])];
      // transpose of matrix
      for (let y = 0; y < shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]];
        }
      }
      // reverse order of rows
      shape.forEach((row) => row.reverse());
      if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
        this.fallingPiece.shape = shape;
      }
    }
    this.renderGameState();
  }
}
