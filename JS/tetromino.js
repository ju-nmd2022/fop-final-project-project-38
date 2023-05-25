class Tetromino {
  constructor(tetrominoes) {
    this.row = 0; // Initial row position
    this.col = Math.floor(COLS / 2); // Initial column position
    this.color = this.getRandomColor();
    this.shape = this.getRandomShape();
    this.tetrominoes = tetrominoes;
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
    if (this.canMoveDown()) {
      this.row++;
    } else {
      // Tetromino has reached the bottom or collided with another tetromino
      // Add the current tetromino to the tetrominoes array
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col] === 1) {
            tetrominoes[this.row + row][this.col + col] = this.color;
          }
        }
      }
      // Create a new tetromino
      tetromino = new Tetromino();
    }
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.col--;
    }
  }

  moveRight() {
    if (this.canMoveRight()) {
      this.col++;
    }
  }

  rotate() {
    const rotatedShape = [];
    for (let col = 0; col < this.shape[0].length; col++) {
      const newRow = [];
      for (let row = this.shape.length - 1; row >= 0; row--) {
        newRow.push(this.shape[row][col]);
      }
      rotatedShape.push(newRow);
    }
    if (this.canRotate(rotatedShape)) {
      this.shape = rotatedShape;
    }
  }

  getRandomShape() {
    const shapes = [
      [[1, 1, 1, 1]],
      [[1, 1], [1, 1]],
      [[1, 1, 1], [0, 1, 0]],
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1, 1], [1, 1, 0]],
      [[1, 1, 1], [1, 0, 0]],
      [[1, 1, 1], [0, 0, 1]],
    ];
    return random(shapes);
  }

  getRandomColor() {
    return color(random(255), random(255), random(255));
  }
  
  canMoveDown() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          const nextRow = this.row + row + 1;
          // Check if the next row is out of bounds or occupied by another tetromino
          if (
            nextRow >= ROWS || // Out of bounds
            (nextRow < ROWS && tetrominoes[nextRow][this.col + col]) // Occupied by another tetromino
          ) {
            return false; 
          }
        }
      }
    }
    return true; 
  }
  moveDown() {
    if (this.canMoveDown()) {
      this.row++;
    } else {
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col] === 1) {
            tetrominoes[this.row + row][this.col + col] = this.color;
          }
        }
      }
      tetromino = new Tetromino();
    }
  }

  canMoveLeft() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          const nextCol = this.col + col - 1;
          // 
          if (
            nextCol < 0 || 
            (nextCol >= 0 && tetrominoes[this.row + row][nextCol]) 
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  canMoveRight() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          const nextCol = this.col + col + 1;
          if (
            nextCol >= COLS || 
            (nextCol < COLS && tetrominoes[this.row + row][nextCol]) 
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  canRotate(rotatedShape) {
    for (let row = 0; row < rotatedShape.length; row++) {
      for (let col = 0; col < rotatedShape[row].length; col++) {
        if (rotatedShape[row][col] === 1) {
          const newRow = this.row + row;
          const newCol = this.col + col;
          if (
            newRow < 0 || 
            newRow >= ROWS || 
            newCol < 0 || 
            newCol >= COLS || 
            tetrominoes[newRow][newCol] 
          ) {
            return false;
          }
        }
      }
    }
    return true; 
  }
}
