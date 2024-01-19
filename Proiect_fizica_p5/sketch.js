//game variables

let dino,myText,myOtherText,lostGame;

let score = 0;

let lastSpawn = 0;

let spawnDelay = 2000;

let obstacles = [];

let screen = null;

function setup() {
  // Set canvas size to be a bit larger and centered on the page
  let canvas = createCanvas(600, 500);
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);

  dino = new dinoSquare();

  // Text displayed at the bottom of the canvas
  myText = createP("Click To Start The Game");
  myText.style("font-size", "20px");
  myText.style("color", "#000000");
  myText.position(width / 2 - myText.width / 2, height / 2 + 200);

  myOtherText = createP("Click To Play Again (or Click space bar)");
  myOtherText.style("font-size", "20px");
  myOtherText.style("color", "#000000");
  myOtherText.position(width / 2 - myOtherText.width / 2, height / 2 + 230);
}


function draw() {
  // Display the game obstacles
  if (millis() >= lastSpawn + spawnDelay) {
    obstacles.push(new Obstacles());
    spawnDelay = random([0.6, 0.7, 0.8, 0.9, 1]) * 1000;
    lastSpawn = millis();
    score++;
  }

  // Set background color to light green
  background(144, 238, 144); // RGB values for light green

  for (let o of obstacles) {
    // Set fill color for dark green
    fill(0, 100, 0); // RGB values for dark green
    o.show();
    o.move();

    // What happens when the dino collides with the obstacles
    if (dino.collides(o)) {
      noLoop();
      lostGame = true;
      screen = 2;
    }
  }

  // Set fill color for black
  fill(0); // RGB values for black
  dino.show();
  dino.move();

  if (keyIsDown(UP_ARROW)) {
    dino.jump();
  }

  countScore();

  // Display "Click to Start" at the beginning
  if (score === 0 && !lostGame) {
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255); // RGB values for white
    text("Click to Start", width / 2, height / 2);
  }

  // Display "Game Over" when the player loses
  if (lostGame) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // RGB values for red
    text("Game Over", width / 2, height / 2 + 40);
  

  // Draw a sad face or insert an emoji
  fill(255, 0, 0); // RGB values for red
  textSize(32);
  text("😞", width / 2, height / 2 + 80); // You can adjust the position as needed
  
  }

}

function mousePressed() {
  if (screen === 2) {
    restartGame();
  } else if (score === 0) {
    loop(); // Start the game when clicked at the beginning
  }
}



function keyPressed() {
  if (key === " ") {
    dino.jump();

    //restart the game when space bar is clicked
    if (lostGame === true) {
      restartGame();
    }
  }
}

//restart the game when the canvas is clicked on
function mousePressed() {
  if (screen === 2) {
    restartGame();
  }
}

const countScore = () => {
  fill(255);
  noStroke();
  textSize(20);
  text("Score:" + score, 40, 20);
};

//function that restarts the game
const restartGame = () => {
  score = 0;
  obstacles = [];
  lostGame = false;
  dino = new dinoSquare();
  lastSpawn = 0;
  spawnDelay = 500;
  new Obstacles();
  loop();
};

//class for creating the dino for the game
class dinoSquare {
  constructor() {
    this.x = 20;
    this.rectSize = 40;
    this.y = height - this.rectSize;
    this.velocityY = 0;
    this.gravity = 0.65;
    this.constrainY = 0;
  }

  jump() {
    if (this.y === height - this.rectSize) {
      this.velocityY = -12;
    }
  }

  move() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;
    this.y = constrain(this.y, this.constrainY, height - this.rectSize);
  }

  show() {
    fill(0); // Set fill color to black
    rect(this.x, this.y, this.rectSize, this.rectSize);
  }
  //detect the collisions between the dino and the obstacles
  collides(obstacle) {
    let collide = collideRectRect(
      this.x,
      this.y,
      this.rectSize,
      this.rectSize,
      obstacle.x,
      obstacle.y,
      obstacle.obstacleSize,
      obstacle.obstacleSize
    );
    return collide;
  }
}

//class the creates the obstacles for the game
class Obstacles {
  constructor() {
    this.obstacleSize = 40;
    this.x = width;
    this.obstaclePos = 40;
    this.y = height - this.obstaclePos;
  }
  show() {
    rect(this.x, this.y, this.obstacleSize, this.obstacleSize);
  }
 move() {
    this.x -= 11
  }
}