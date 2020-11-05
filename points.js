class Points {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
  }

  draw() {
    fill("rgb(30,255,30)");
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    this.pos.x -= 1;

    if (this.pos.x - this.r <= 0) {
      this.pos.x = MAP_WIDTH;
      this.pos.y = random(0, MAP_HEIGHT);
    }
  }
}
