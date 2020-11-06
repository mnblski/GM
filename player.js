class Player {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;

    // previous setting for below 500, 500
    this.vel = createVector(55, 55);
    this.mag = 7;
    this.velLerp = 0.1;
    this.score = 0;

    // this.boostPoints = 4200;
  }

  // player is following the coursor, lerp adds delay, vel and mag relates to the change of the position
  update() {
    let mouse = createVector(mouseX - width / 2, mouseY - height / 2);
    mouse.setMag(this.mag);
    this.vel.lerp(mouse, this.velLerp);
    this.pos.add(this.vel);

    if (
      //boundaries of the map for movement
      this.pos.x <= MAP_WIDTH - this.r &&
      this.pos.x >= 0 + this.r &&
      this.pos.y > 0 + this.r &&
      this.pos.y < MAP_HEIGHT - this.r
    ) {
      mouse.setMag(this.mag);
      this.vel.lerp(mouse, this.velLerp);
      this.pos.add(this.vel);
    } else {
      mode = 2;
    }
  }

  // accelerates the vehicle
  boost() {
    this.mag += 0.7;
  }

  // slows the vehicle down
  slowDown() {
    this.mag -= 1;
  }

  // player grows when eats coins - uncomment and change to adjust
  //bigger you get - slower your moves are - adjust lerp in update()
  eats(point) {
    let d = p5.Vector.dist(this.pos, point.pos);
    if (d < this.r + point.r) {
      this.score += 1;
      return true;
    } else {
      return false;
    }
  }

  collisionCheck(obstacle) {
    let d = p5.Vector.dist(this.pos, obstacle.pos);

    if (
      d < this.r + obstacle.r &&
      obstacle.type === "makeSmaller" &&
      this.r > 5
    ) {
      // let sum = PI * this.r * this.r + PI * obstacle.r * obstacle.r;
      this.r /= 1.1;
      return true;
    }
    if (d < this.r + obstacle.r && obstacle.type === "aster") {
      console.log("GAME OVER");
      return true;
    }
    if (d < this.r + obstacle.r && obstacle.type === "makeBigger") {
      let sum = PI * this.r * this.r + PI * obstacle.r * obstacle.r;
      this.r *= 1.1;
      return true;
    }
    if (d < this.r + obstacle.r && obstacle.type === "makeMBigger") {
      let sum = PI * this.r * this.r + PI * obstacle.r * obstacle.r;
      this.r *= 1.15;
      return true;
    }
  }

  draw() {
    stroke("rgb(30,255,30)");
    strokeWeight(1);
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
