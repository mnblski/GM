let player;
let coins = [];
let zoom = 0.01;

let bg2;

let asteroids = [];
let stars = [];
let starsStatS = [];
let starsStatM = [];

// declare obstacles
let obsMakeSmaller = [];
let obsMakeBigger = [];
let obsMakeMBigger = [];
let obsFreeze3sec = [];
let mode;

let bgsong;

function preload() {
  bgsong = loadSound("./assets/bg.mp3");
}

function setup() {
  mode = 0;
  createCanvas(windowWidth, windowHeight);

  bg2 = new BgBlack();
  player = new Player(0, 0, 40);

  for (let i = 0; i < 200; i++) {
    let randomX = random(-MAP_WIDTH, -200);
    var randomY = random(70, MAP_HEIGHT - 70);
    asteroids[i] = new Asteroids(randomX, randomY, random(30, 180), "aster");
  }

  for (let i = 0; i < 600; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    stars[i] = new Asteroids(randomX, randomY, random(3, 5), "star");
  }

  for (let i = 0; i < 2000; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    starsStatS[i] = new Asteroids(
      randomX,
      randomY,
      random(1, 3),
      "star-static-small"
    );
  }

  for (let i = 0; i < 800; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    starsStatM[i] = new Asteroids(
      randomX,
      randomY,
      random(2, 3),
      "star-static-mid"
    );
  }

  //all points on the map
  for (let i = 0; i < 200; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    coins[i] = new Points(randomX, randomY, 13);
  }

  //all obstacles on the map
  for (let i = 0; i < 140; i++) {
    let randomX = random(-MAP_WIDTH, 0);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeSmaller[i] = new Obstacle(randomX, randomY, 8, "makeSmaller");
  }

  for (let i = 0; i < 80; i++) {
    let randomX = random(-MAP_WIDTH, 0);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeBigger[i] = new Obstacle(randomX, randomY, 10, "makeBigger");
  }

  for (let i = 0; i < 40; i++) {
    let randomX = random(-MAP_WIDTH, 0);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeMBigger[i] = new Obstacle(randomX, randomY, 12, "makeMBigger");
  }
}

function draw() {
  clear();
  if (mode == 0) {
    background("black");

    push();
    for (let i = stars.length - 1; i >= 0; i--) {
      stars[i].draw();
    }
    pop();

    push();
    for (let i = starsStatS.length - 1; i >= 0; i--) {
      starsStatS[i].draw();
    }
    pop();

    push();
    for (let i = starsStatM.length - 1; i >= 0; i--) {
      starsStatM[i].draw();
    }
    pop();

    fill("red");
    text("Press ENTER to start", width / 2 - 144, height / 2 - 30);
    textSize(15);

    fill("red");
    text(
      "✓ your goal is to collect as many green stars as possible",
      width / 2 - 220,
      height / 2
    );
    textSize(15);

    fill("red");
    text(
      "✕ avoid touching asteroids and borders of the map - red stars change the size of your vehicle.",
      width / 2 - 325,
      height / 2 + 20
    );
    textSize(11);

    fill("red");
    text(
      "press SPACE to slow down - RIGHT CLICK on mouse to accelerate",
      width / 2 - 190,
      height / 2 + 50
    );
    textSize(23);
  }
  if (mode == 1) {
    background("black");
    //centers the player in the middle of the window (viewport)
    translate(width / 2, height / 2);

    // zooms in the wors around instead of the player itself when you eat circles
    let newzoom = 30 / player.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);

    // ??
    translate(-player.pos.x, -player.pos.y);

    //draw coins - remove from the array when eaten
    push();
    for (let i = coins.length - 1; i >= 0; i--) {
      coins[i].draw();
      if (player.eats(coins[i])) {
        coins.splice(i, 1);
      }
    }
    pop();

    // draw all obstacles
    push();
    for (let i = obsMakeSmaller.length - 1; i >= 0; i--) {
      obsMakeSmaller[i].draw();
      if (player.collisionCheck(obsMakeSmaller[i])) {
        obsMakeSmaller.splice(i, 1);
      }
    }
    pop();

    push();
    for (let i = obsMakeBigger.length - 1; i >= 0; i--) {
      obsMakeBigger[i].draw();
      if (player.collisionCheck(obsMakeBigger[i])) {
        obsMakeBigger.splice(i, 1);
      }
    }
    pop();

    push();
    for (let i = obsMakeMBigger.length - 1; i >= 0; i--) {
      obsMakeMBigger[i].draw();
      if (player.collisionCheck(obsMakeMBigger[i])) {
        obsMakeMBigger.splice(i, 1);
      }
    }
    pop();

    push();
    for (let i = stars.length - 1; i >= 0; i--) {
      stars[i].draw();
    }
    pop();

    push();
    for (let i = starsStatS.length - 1; i >= 0; i--) {
      starsStatS[i].draw();
    }
    pop();

    push();
    for (let i = starsStatM.length - 1; i >= 0; i--) {
      starsStatM[i].draw();
    }
    pop();

    push();
    for (let i = asteroids.length - 1; i >= 0; i--) {
      asteroids[i].draw();
      if (player.collisionCheck(asteroids[i])) {
        asteroids.splice(i, 1);
        mode = 2;
      }
    }
    pop();

    push();
    bg2.draw();
    pop();

    // player draw
    push();
    player.draw();
    player.update();
    pop();

    //boost for speed when mouse clicked
    if (mouseIsPressed) {
      if (mouseButton === LEFT) {
        player.boost();
      }
    }

    push();
    let newScore = document.getElementById("score");
    newScore.textContent = `Score: ${player.score}`;
    pop();
  }

  //game over - retry
  if (mode == 2) {
    // push();
    noLoop();
    background(0);
    // pop();

    loop();
    push();
    for (let i = asteroids.length - 1; i >= 0; i--) {
      asteroids[i].draw();
    }
    pop();

    fill("red");
    text(`YOUR SCORE: ${player.score}`, width / 2 - 140, height / 2);
    textSize(35);

    // fill("red");
    // text("Press ENTER to start again.", width / 2 - 120, height / 2 + 30);
    // textSize(45);

    push();
    let newScore = document.getElementById("score");
    newScore.textContent = "";
    pop();
  }
}

// resizing canvas to the window size (viewport)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
    bgsong.play();
  }
  if (keyCode === 32) {
    player.slowDown();
  }
}
