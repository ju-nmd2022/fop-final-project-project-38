class Tetromino {
  constructor() {
    this.row = 0; // Initial row position
    this.col = Math.floor(COLS / 2); // Initial column position
    this.shape = this.getRandomShape();
    this.image = this.getImageForShape(this.shape);
  }

  show() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          image(
            this.image,
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
    //convert this to if statement to check for collision and so on with the other moves
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

  getImageForShape(shape) {
    const shapeImagesMap = {
      [[[1, 1, 1, 1]]]: loadImage("../IMG/shape1.png"),
      [[[1, 1], [1, 1]]]: loadImage("../IMG/shape2.png"),
      [[[1, 1, 1], [0, 1, 0]]]: loadImage("../IMG/shape3.png"),
      [[[1, 1, 0], [0, 1, 1]]]: loadImage("../IMG/shape4.png"),
      [[[0, 1, 1], [1, 1, 0]]]: loadImage("../IMG/shape5.png"),
      [[[1, 1, 1], [1, 0, 0]]]: loadImage("../IMG/shape6.png"),
      [[[1, 1, 1], [0, 0, 1]]]: loadImage("../IMG/shape7.png"),
    };
    const shapeKey = JSON.stringify(shape);
    return shapeImagesMap[shapeKey];
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
