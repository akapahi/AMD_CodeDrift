let font;

let angle = 0;
let velocity = 0;
let acceleration = 0;

let stiffness = 0.4;   // spring strength
let damping = 0.85;     // friction
let targetAngle = 0;

let spinTimer = 0;
let spinInterval = 100;     // frames to wind up
let maxRotation = 3.1415 / 2;   // how far it twists

function preload() {
  font = loadFont('Doto-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  textAlign(CENTER, CENTER);
  textFont(font);
  background('#3C2350');

}

function draw() {
  background('#3C2350');

  if (spinTimer < spinInterval) {
    // Slow wind-up
    angle = map(spinTimer, 0, spinInterval, 0, maxRotation);
    spinTimer++;
  } else {
    
    // Spring snap back
    let force = stiffness * (targetAngle - angle);
    acceleration = force;
    velocity += acceleration;
    velocity *= damping;
    angle += velocity;

    if (abs(angle - targetAngle) < 0.001 && abs(velocity) < 0.001) {
      spinTimer = 0;
      angle = 0;
      velocity = 0;
    }
  }

  push();
  translate(width / 2, height / 2);
  rotate(angle);   // ← 2D rotation
  fill('#8C53D5');
  textSize(50);
  text("Code\nDrift\nCollective", 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
