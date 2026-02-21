let fontSize = 100;
let stretchX = 1;
let stretchY = 1;
let velocity = 0;
let acceleration = 0;
let damping = 0.85;
let stiffness = 0.2;
let targetStretch = 1;

let boingTimer = 0;
let boingInterval = 60; // frames
let maxStretch = 2.5;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');

}

function draw() {
  background(10);

  if (boingTimer < boingInterval) {
    // Slow chewing gum stretch
    stretchX = map(boingTimer, 0, boingInterval, 1, maxStretch);
    stretchY = map(boingTimer, 0, boingInterval, 1, 1 / maxStretch);
    boingTimer++;
  } else {
    // Spring-back using physics on stretchX
    let force = stiffness * (targetStretch - stretchX);
    acceleration = force;
    velocity += acceleration;
    velocity *= damping;
    stretchX += velocity;

    // Match Y inversely to X for squish effect
    stretchY = 1 / stretchX;

    if (abs(stretchX - targetStretch) < 0.001 && abs(velocity) < 0.001) {
      boingTimer = 0;
      stretchX = 1;
      stretchY = 1;
      velocity = 0;
    }
  }

  // Draw the animated text
  push();
  translate(width / 2, height / 2);
  scale(stretchX, stretchY); // finally actually stretching it both ways!
  textSize(fontSize);
  fill(240);
  text("CODE\nDRIFT\nCOLLECTIVE", 0, 0);
  pop();
}

// Save a 5-second gif when the user presses the 's' key.
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10);
  }
}
