//python -m http.server
let minSpeed = 10;
let maxSpeed = 20;
let target;
let playAgain;
let lastClick = 0;
let nextLevel = 5;
let score = 0;
let highscore = 0;
let startTime = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(100);
  target = new Target();
}

function draw() {
  background(200);

  textAlign(RIGHT, TOP);
  textSize(30);
  text("Score: " + score, width - 10, 10);
  text("High Score: " + highscore, width - 10, 40);
  textAlign(CENTER, TOP);
  textSize(60);

  fill(255, 0, 0);
  text(60 - Math.floor((millis() - startTime) / 1000), width / 2, 10);

  fill(255);
  square(target.x, target.y, 50);
  target.move();

  if (target.x > width || target.x < 0) {
    target = new Target();
  }

  checkLevel();
  checkHighScore();
  if (millis() - startTime >= 60000) {
    endGame();
  }
}

class Target {
  constructor() {
    if (random(["l", 'r']) == 'l') {
      this.x = 0;
      this.direction = "left";
    } else {
      this.x = width;
      this.direction = "right";
    }
    this.y = random(0, height - 20);
    this.endY = random(0, height - 20);
    this.slope = (this.endY - this.y) / width;
    this.speed = random(minSpeed, maxSpeed);
    if (Math.floor(this.speed - minSpeed) > 1) {
      this.points = Math.floor(this.speed - minSpeed);
    } else {
      this.points = 1;
    }
  }

  move() {
    if (this.direction == "left") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    this.y += this.slope * this.speed;
  }
}

function mousePressed() {
  if (millis() - lastClick >= 500 || millis() < 500) {
    if ((mouseX >= target.x && mouseX <= target.x + 50) && (mouseY >= target.y && mouseY <= target.y + 50)) {
      score += target.points;
      target = new Target();
    }
    lastClick = millis();
  }
}

function checkLevel() {
  if (score >= nextLevel) {
    minSpeed += 5;
    maxSpeed += 5;
    nextLevel += 5;
  }
}

function checkHighScore() {
  if (score > highscore) {
    highscore = score;
  }
}

function endGame() {
  noLoop();
  textAlign(CENTER, BOTTOM);
  textSize(80);
  text("GAME OVER", width / 2, height / 2);
  textAlign(CENTER, TOP);
  textSize(65);
  text("Score: " + score, width / 2, height / 2);
  playAgain = createButton("Play Again");
  playAgain.position(width / 2, height * 0.3);
  playAgain.mouseClicked(reset);
}

function reset() {
  playAgain.remove();
  minSpeed = 10;
  maxSpeed = 20;
  nextLevel = 5;
  score = 0;
  lastClick = 0;
  target = new Target;
  startTime = millis();
  loop();
}