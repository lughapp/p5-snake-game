class Snake {
  speed = 1;
  direction = "left";
  tail = [];
  head = {};
  size = 10;

  constructor() {
    this.head = createVector(floor(cols / 2), floor(rows / 2));
    this.head.mult(scale);

    for (let i = 0; i < this.size; i++) {
      this.tail[i] = createVector(this.head.x, this.head.y);
    }
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++)
      this.tail[i] = this.tail[i + 1];

    this.move();
    this.tail[this.tail.length - 1] = createVector(this.head.x, this.head.y);
  }

  move() {
    switch (this.direction) {
      case "up":
        this.head.y = this.head.y - this.speed * scale;
        break;
      case "down":
        this.head.y = this.head.y + this.speed * scale;
        break;
      case "left":
        this.head.x = this.head.x - this.speed * scale;
        break;
      case "right":
        this.head.x = this.head.x + this.speed * scale;
        break;
    }

    this.head.x = constrain(this.head.x, 0, wWidth - scale);
    this.head.y = constrain(this.head.y, 0, wHeight - scale);
  }

  intersects(pos) {
    if (this.intersectsHead(pos)) return true;

    for (let i = 0; i < this.tail.length - 1; i++)
      if (this.tail[i].x === pos.x && this.tail[i].y === pos.y) return true;

    return false;
  }

  intersectsSelf() {
    for (let i = 0; i < this.tail.length - 1; i++)
      if (this.intersectsHead(this.tail[i])) return true;

    return false;
  }

  intersectsHead(pos) {
    return this.head.x === pos.x && this.head.y === pos.y;
  }

  changeDirection(dir) {
    this.direction = dir;
  }

  getSize(){
    return (this.size - 10) * 850;
  }

  show() {
    fill("#ccc");
    stroke("#fafafa");

    for (let i = 0; i < this.tail.length; i++)
      rect(this.tail[i].x, this.tail[i].y, scale, scale);

    rect(this.head.x, this.head.y, scale, scale);
  }
}
