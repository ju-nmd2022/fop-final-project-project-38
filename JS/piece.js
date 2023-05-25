class Piece {
  constructor(shape) {
    this.shape = shape;
    this.y = 0;
    this.x = Math.floor(COLS / 2);
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
