export default class Tetromino {
    constructor(shape) {
      this.shape = shape;
      this.sprite = createSprite();
      this.sprite.addAnimation('default', shape);
      this.sprite.scale = BLOCK_SIZE / max(shape.width, shape.height);
    }
  
    setPosition(x, y) {
      this.sprite.position.x = x;
      this.sprite.position.y = y;
    }
  
    display() {
      this.sprite.display();
    }
  }