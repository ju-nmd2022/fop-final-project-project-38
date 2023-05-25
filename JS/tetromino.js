export default class Tetromino {
  constructor(shapeFile) {
    this.shapeFile = shapeFile;
    this.sprite = createSprite();
    this.sprite.addAnimation('default', this.loadShape(shapeFile));
    this.x = 0;
    this.y = 0;
    this.speed = 1;
  }
  
  loadShape(shapeFile) {
    const shapeImage = loadImage(`../${Tetrominoes.svg}`);
    return shapeImage;
  }
  
  setPosition(x, y) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.x = x;
    this.y = y;
  }
  
  update() {
    // Move the tetromino horizontally
    this.x += this.speed;
    this.sprite.position.x = this.x;
    
    // Collision detection
    if (this.x > width) {
      this.x = -this.sprite.width; 
      this.sprite.position.x = this.x;
    }
  }
  
  draw() {
    drawSprites();
  }
  
  isStopped() {
    return false;
  }
}
