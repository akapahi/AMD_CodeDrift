let imgs = [];
let imagePaths = [
  "img.gif"
];

let cells = [];
let totalWidth = 0;
let scrollX = 0;
let scrollSpeed = 0.5;

function preload() {
  for (let path of imagePaths) {
    imgs.push(loadImage(path));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateGrid();
}

function generateGrid() {
  cells = [];
  totalWidth = 0;

  let y = 0;

  while (y < height) {
    let rowH = random(120, 260);
    if (y + rowH > height) rowH = height - y;

    let x = 0;

    while (x < width * 2) { // make it wider than screen for looping
      let colW = random(120, 260);

      cells.push({
        x: x,
        y: y,
        w: colW,
        h: rowH,
        img: random(imgs),
        depth: random(0.85, 1.15),
        offset: random(1000)
      });

      x += colW;
    }

    totalWidth = max(totalWidth, x);
    y += rowH;
  }
}

function draw() {
  background(10);

  scrollX -= scrollSpeed;
  if (scrollX < -totalWidth) scrollX = 0;

  translate(scrollX, 0);

  for (let c of cells) {
    push();

    let breathe = sin(frameCount * 0.02 + c.offset) * 15;

    // parallax illusion
    let px = c.x;
    let py = c.y;

    translate(px * c.depth, py * c.depth + breathe);
    scale(c.depth);

    // soft shadow
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = "rgba(0,0,0,0.4)";
    drawingContext.shadowOffsetY = 10 * (c.depth - 1);

    imageMode(CORNER);
    image(c.img, 0, 0, c.w * 0.95, c.h * 0.95);

    pop();
  }
}

function mousePressed() {
  generateGrid();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateGrid();
}
