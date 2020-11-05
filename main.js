let player;
let coins = [];
let zoom = 1;
// let score;

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

//let bgMusic;

function preload() {
  //bgMusic = loadSound("amb.mp3");
}

function setup() {
  mode = 0;
  createCanvas(windowWidth, windowHeight);
  //bgMusic.play();

  bg2 = new BgBlack();
  player = new Player(0, 0, 30);

  for (let i = 0; i < 330; i++) {
    let randomX = random(-MAP_WIDTH, 0);
    var randomY = random(70, MAP_HEIGHT - 70);
    asteroids[i] = new Asteroids(randomX, randomY, random(70, 370), "aster");
  }

  for (let i = 0; i < 600; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    stars[i] = new Asteroids(randomX, randomY, random(4, 6), "star");
  }

  for (let i = 0; i < 1700; i++) {
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
      random(3, 4),
      "star-static-mid"
    );
  }

  //all points on the map
  for (let i = 0; i < 450; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    coins[i] = new Points(randomX, randomY, 12);
  }

  //all obstacles on the map
  for (let i = 0; i < 170; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeSmaller[i] = new Obstacle(randomX, randomY, 10, "makeSmaller");
  }

  for (let i = 0; i < 131; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeBigger[i] = new Obstacle(randomX, randomY, 15, "makeBigger");
  }

  for (let i = 0; i < 100; i++) {
    let randomX = random(0, MAP_WIDTH);
    var randomY = random(0, MAP_HEIGHT);
    obsMakeMBigger[i] = new Obstacle(randomX, randomY, 20, "makeMBigger");
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

    for (let i = 0; i < 450; i++) {
      let randomX = random(0, MAP_WIDTH);
      var randomY = random(0, MAP_HEIGHT);
      coins[i] = new Points(randomX, randomY, 12);
    }

    fill("red");
    text("Press enter to start", width / 2 - 250, height / 2);
    textSize(58);
  }
  if (mode == 1) {
    background("black");
    //centers the player in the middle of the window (viewport)
    translate(width / 2, height / 2);

    // zooms in the wors around instead of the player itself
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
      // if (player.collisionCheck(asteroids[i])) {
      //   asteroids.splice(i, 1);
      // }
    }
    pop();

    push();
    bg2.draw();
    pop();

    // push();
    // score.draw();
    // pop();

    // player draw
    push();
    player.draw();
    player.update();
    pop();

    //boost for speed when mouse clicked
    // if (mouseIsPressed) {
    //   if (mouseButton === LEFT) {
    //     player.boost();
    //   }
    // }

    push();
    let newScore = document.getElementById("score");
    newScore.textContent = `Score:${player.score}`;
    pop();
  }

  //game over - retry
  if (mode == 2) {
    push();
    noLoop();
    background(10);
    pop();

    loop();
    fill("white");
    text(`your score: ${player.score}`, width / 2 - 250, height / 2);
    textSize(58);

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
  }
}
