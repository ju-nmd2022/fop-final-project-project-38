export default class Tetromino {
  constructor(shape) {
    this.shape = shape;
    this.sprite = createSprite();
    this.sprite.addAnimation('default', shape);
  }
  
  setPosition(x, y) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }
  
  update() {
    
  }
  
  draw() {
  }
  
  isStopped() {
    return false;
  }
}