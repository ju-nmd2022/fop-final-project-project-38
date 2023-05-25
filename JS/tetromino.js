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
    this.row++;
  }

  moveLeft() {
    this.col--;
  }

  moveRight() {
    this.col++;
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
    this.shape = rotatedShape;
  }

  getRandomShape() {
    const shapes = [
      [],
      [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]
      ], 
  
      [
          [2,0,0],
          [2,2,2],
          [0,0,0],
      ],
  
      [
          [0,0,3],
          [3,3,3],
          [0,0,0],
      ],
  
      [
          [4,4],
          [4,4],
      ],
  
      [
          [0,5,5],
          [5,5,0],
          [0,0,0],
      ],
  
      [
          [0,6,0],
          [6,6,6],
          [0,0,0],
      ],
  
      [
          [7,7,0],
          [0,7,7],
          [0,0,0],
      ],
      [
          [0,0,0],
          [8,8,8],
          [0,8,0],
      ]];
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
}
