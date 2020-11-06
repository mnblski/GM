class BgBlack {
  constructor() {}

  //main background, frame, and rectangles that cover moving objects
  draw() {
    fill(0);
    noStroke();
    rect(-MAP_WIDTH, 0, MAP_WIDTH, MAP_HEIGHT);

    fill(0);
    noStroke();
    rect(-MAP_WIDTH, 0, MAP_WIDTH * 2, -1000);

    fill(0);
    noStroke();
    rect(-MAP_WIDTH, MAP_HEIGHT, MAP_WIDTH * 2, 1000);

    fill(0);
    noStroke();
    rect(MAP_WIDTH, -400, 1000, MAP_HEIGHT + 2000);

    noFill();
    stroke("rgb(30,255,30)");
    strokeWeight(1);
    rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  }
}
