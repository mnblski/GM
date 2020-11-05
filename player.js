class Player {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;

    // previous setting for below 500, 500
    this.vel = createVector(500, 500);

    this.mag = 5;
    this.velLerp = 0.1;

    this.score = 0;
    this.boostCount = 0;

    // this.boostPoints = 4200;
  }

  // player is following the coursor, adjust 0,05 for delay
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
      //this.pos.add(10.1, 11);
      this.pos.sub(this.vel);
      // add game over here if you touch boundaries
    }
  }

  //adjust mag for speed and velLerp for sensitivity - add only if certain score??
  // boost() {
  //   if (this.boostCount === 3) {
  //     this.boostCount -= 2;
  //     this.mag -= 0.5;
  //   } else {
  //     this.mag += 0.5;
  //     this.boostCount += 1;
  //   }
  // }

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

  updateScore(score) {
    document.getElementById("score");
  }

  collisionCheck(obstacle) {
    let d = p5.Vector.dist(this.pos, obstacle.pos);

    if (d < this.r + obstacle.r && obstacle.type === "makeSmaller") {
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
      this.r = sqrt(sum / PI);
      return true;
    }
    if (d < this.r + obstacle.r && obstacle.type === "makeMBigger") {
      let sum = PI * this.r * this.r + PI * obstacle.r * obstacle.r;
      this.r = sqrt(sum / PI);
      return true;
    }
  }

  draw() {
    stroke("rgb(30,255,30)");
    strokeWeight(1);
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

    // push();
    // textSize(102);
    // text(`${this.score}`, this.pos.x, this.pos.y, "fixed");
    // fill("white");
    // pop();
  }
}
