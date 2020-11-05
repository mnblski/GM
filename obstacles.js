class Obstacle {
  constructor(x, y, r, type) {
    this.pos = createVector(x, y);
    this.r = r;
    this.type = type;
  }

  draw() {
    if (this.type === "makeSmaller") {
      fill("red");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      this.pos.x += 1; //1.5
    }
    if (this.type === "makeBigger") {
      fill("red");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      this.pos.x += 2;
    }
    if (this.type === "makeMBigger") {
      fill("red");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      this.pos.x += 2;
    }

    if (this.pos.x + this.r >= MAP_WIDTH && this.type === "makeSmaller") {
      this.pos.x = 0;
      this.pos.y = random(0, MAP_HEIGHT);
    }
    if (this.pos.x + this.r >= MAP_WIDTH && this.type === "makeBigger") {
      this.pos.x = 0;
      this.pos.y = random(0, MAP_HEIGHT);
    }
    if (this.pos.x + this.r >= MAP_WIDTH && this.type === "makeMBigger") {
      this.pos.x = 0;
      this.pos.y = random(0, MAP_HEIGHT);
    }
  }
}
