class Tetromino {
  constructor() {
    this.row = 0; // Initial row position
    this.col = Math.floor(COLS / 2); // Initial column position
    this.color = this.getRandomColor(); 
    this.shape = this.getRandomShape();
  }

  show() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          fill(this.color);
          rect(
            (this.col + col) * BLOCK_SIZE,
            (this.row + row) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  }

  update() {
  }

  moveDown() {
    if (this.canMove(this.col, this.row + 1, this.shape)) {
      this.row++;
    }
  }

  moveLeft() {
    if (this.canMove(this.col - 1, this.row, this.shape)) {
      this.col--;
    }
  }

  moveRight() {
    if (this.canMove(this.col + 1, this.row, this.shape)) {
      this.col++;
    }
  }

  rotate() {
    const rotatedShape = [];
    const piece = this.shape;
  
    for (let i = 0; i < piece.length; i++) {
      rotatedShape.push([]);
      for (let j = 0; j < piece[i].length; j++) {
        rotatedShape[i].push(0);
      }
    }
  
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        rotatedShape[i][j] = piece[j][i];
      }
    }
  
    for (let i = 0; i < rotatedShape.length; i++) {
      rotatedShape[i] = rotatedShape[i].reverse();
    }
  
    if (!this.canMove(this.col, this.row, rotatedShape)) {
      this.shape = rotatedShape;
    }
    renderGame();
  }
  

  getRandomShape() {
    const shapes = [
      [[1, 1, 1, 1]], 
      [[1, 1], [1, 1]], 
      [[1, 1, 1], [0, 1, 0]],
    ];
    return random(shapes);
  }

  getRandomColor() {
    return color(random(255), random(255), random(255)); // Generate a random color
  }

  canMove(x, y, rotatedPiece) {
    const piece = rotatedPiece || this.shape;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] === 1) {
          const p = x + j;
          const q = y + i;
          if (q >= ROWS || (p >= 0 && p < COLS && tetrominoes[q][p] > 0)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
