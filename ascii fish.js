let fontSize = 32;
let fishes = [];
let waveOffset = 0;

function setup() {
  createCanvas(600, 400);
  textSize(fontSize);
  textFont('monospace');
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 1; i++) {
    fishes.push(new Fish(random(-100, 0), 300, "><(((º>"));
  }
}

function draw() {
  background(180, 220, 255);

  waveOffset += 0.03;
  drawWavyWater();

  for (let fish of fishes) {
    fish.update();
    fish.display();
  }
}

function drawWavyWater() {
  stroke(0, 100, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let y = getWaterY(x);
    vertex(x, y);
  }
  endShape();
}

function getWaterY(x) {
  return 320 + sin(x * 0.05 + waveOffset) * 5;
}

class Fish {
  constructor(x, baseY, ascii) {
    this.x = x;
    this.baseY = baseY;
    this.y = baseY;
    this.ascii = ascii;

    this.jumping = false;
    this.jumpPhase = 0;
    this.jumpStartX = 0;
    this.jumpTotalX = 240; // wider jump
    this.jumpDuration = PI;
    this.amplitude = 100;  // higher jump

    this.splashes = [];
  }

  update() {
    if (!this.jumping) {
      this.x += 2;
      this.baseY = getWaterY(this.x);
      this.y = this.baseY;

      if (this.x > 100 && random() < 0.01) {
        this.jumping = true;
        this.jumpPhase = 0;
        this.jumpStartX = this.x;
      }
    } else {
      this.jumpPhase += 0.05;
      let progress = this.jumpPhase / this.jumpDuration;
      this.x = this.jumpStartX + progress * this.jumpTotalX;
      this.baseY = getWaterY(this.x);
      this.y = this.baseY - sin(this.jumpPhase) * this.amplitude;

      if (this.jumpPhase >= this.jumpDuration) {
        this.jumping = false;
        this.y = this.baseY;
        this.spawnSplash(this.x);
      }
    }

    this.updateSplash();

    if (this.x > width) {
      this.x = -textWidth(this.ascii);
    }
  }

  display() {
    if (this.jumping) {
      let dx = this.jumpTotalX / this.jumpDuration;
      let dy = -cos(this.jumpPhase) * this.amplitude;
      let angle = atan2(dy, dx);
      this.drawRotatedFish(this.x, this.y, angle);
    } else {
      text(this.ascii, this.x, this.y);
    }

    this.displaySplash();
  }

  drawRotatedFish(cx, cy, angle) {
    push();
    translate(cx, cy);
    rotate(angle);
    text(this.ascii, 0, 0);
    pop();
  }

  spawnSplash(cx) {
    // splashier!
    for (let i = 0; i < 14; i++) {
      this.splashes.push({
        x: cx + random(-15, 15),
        y: this.baseY + 5,
        vy: random(-4, -1),
        vx: random(-2, 2),
        life: 50,
        char: random(['~', "'", '.', '*', '•', '˚'])
      });
    }
  }

  updateSplash() {
    for (let i = this.splashes.length - 1; i >= 0; i--) {
      let p = this.splashes[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life--;

      if (p.life <= 0) {
        this.splashes.splice(i, 1);
      }
    }
  }

  displaySplash() {
    for (let p of this.splashes) {
      text(p.char, p.x, p.y);
    }
  }
}
