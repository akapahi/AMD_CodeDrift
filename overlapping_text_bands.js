let bands = [];
let phrases = [
  "HERE NOW ",
  "DRIFT ",
  "ATTENTION ",
  "STAY WITH IT ",
  "FOCUS "
];

let currentBand = null;
let bandCount = 0;
let maxBands = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Helvetica");
  textAlign(LEFT, CENTER);
  spawnBand();
}

function draw() {
  background(10);

  // Draw all frozen bands
  for (let band of bands) {
    drawBand(band);
  }

  // Draw current moving band
  if (currentBand) {
    currentBand.offset += currentBand.speed;

    drawBand(currentBand);

    // When band has fully crossed screen → freeze it
    if (currentBand.offset > width * 2) {
      bands.push(currentBand);
      bandCount++;

      if (bandCount < maxBands) {
        spawnBand();
      } else {
        currentBand = null; // stop spawning
      }
    }
  }
}

function spawnBand() {
  currentBand = {
    x: width / 2,
    y: random(height),
    angle: random(-PI/3, PI/3),
    speed: random(2, 4),
    offset: -width * 2,
    phrase: random(phrases),
    size: random(70, 110),
    thickness: random(120, 200)
  };
}

function drawBand(band) {
  push();
  translate(band.x, band.y);
  rotate(band.angle);

  // band background
  noStroke();
  fill(255, 180);
  rectMode(CENTER);
  rect(0, 0, width * 3, band.thickness);

  fill(0);
  textSize(band.size);

  let tWidth = textWidth(band.phrase);

  for (let x = -width * 3; x < width * 3; x += tWidth) {
    text(
      band.phrase,
      x + (band.offset % tWidth),
      0
    );
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
