let bands = [];
let phrases = [
  "HERE NOW ",
  "ATTENTION IS A MOVING TARGET ",
  "STAY WITH IT ",
  "DRIFT DRIFT DRIFT ",
  "FOCUS FOCUS FOCUS "
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Helvetica");
  textAlign(LEFT, CENTER);

  let bandHeight = 120;

  for (let i = 0; i < height / bandHeight + 2; i++) {
    bands.push({
      y: i * bandHeight,
      h: bandHeight,
      speed: random(0.5, 3) * (random() > 0.5 ? 1 : -1),
      offset: random(1000),
      phrase: random(phrases),
      size: random(60, 100)
    });
  }
}

function draw() {
  background(10);

  for (let band of bands) {
    push();

    // Transparent overlapping bands
    fill(255, 180);
    noStroke();
    rect(0, band.y, width, band.h);

    // Text settings
    fill(0);
    textSize(band.size);

    let textWidthSingle = textWidth(band.phrase);
    band.offset += band.speed;

    // Repeat text across screen
    for (let x = -textWidthSingle * 2; x < width + textWidthSingle * 2; x += textWidthSingle) {
      text(
        band.phrase,
        x + band.offset % textWidthSingle,
        band.y + band.h / 2
      );
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
