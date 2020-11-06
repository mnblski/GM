class Asteroids {
  constructor(x, y, r, type) {
    this.pos = createVector(x, y);
    this.r = r;
    this.type = type;

    //below code related to the shape of asteroids
    this.total = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-35, 35);
    }
  }

  draw() {
    push();
    if (this.type === "aster") {
      fill(0);
      stroke(255);
      //ellipse(this.pos.x, this.pos.y, this.r, this.r);
      translate(this.pos.x, this.pos.y);
      beginShape();
      for (let i = 0; i < this.total; i++) {
        let angle = map(i, 0, this.total, 0, TWO_PI);
        let r = this.r + this.offset[i];
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
      }
      endShape(CLOSE);

      this.pos.x += 6;
      pop();
    }

    if (this.type === "star") {
      fill("grey");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      this.pos.x -= 1;
    }

    if (this.type === "star-static-small") {
      fill("white");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    if (this.type === "star-static-mid") {
      fill("white");
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    if (this.pos.x - this.r >= MAP_WIDTH && this.type === "aster") {
      this.pos.x = 0;
      this.pos.y = random(0 + this.r, MAP_HEIGHT - this.r);
    }

    if (this.pos.x <= 0 && this.type === "star") {
      this.pos.x = MAP_WIDTH;
      this.pos.y = random(0, MAP_HEIGHT);
    }
  }
}
