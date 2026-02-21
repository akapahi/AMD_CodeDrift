let imgs = [];
let imagePaths = [
  "img.gif"
];

let cells = [];

function preload() {
  for (let path of imagePaths) {
    imgs.push(loadImage(path));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textureMode(NORMAL);
  noStroke();
  generateGrid();
}

function generateGrid() {
  cells = [];

  let y = -height / 2;

  while (y < height / 2) {
    let rowH = random(120, 260);
    if (y + rowH > height / 2) rowH = height / 2 - y;

    let x = -width / 2;

    while (x < width / 2) {
      let colW = random(120, 260);
      if (x + colW > width / 2) colW = width / 2 - x;

      cells.push({
        x: x + colW / 2,
        y: y + rowH / 2,
        w: colW,
        h: rowH,
        depth: random(40, 200),
        img: random(imgs),
        offset: random(1000)
      });

      x += colW;
    }

    y += rowH;
  }
}

function draw() {
  background(5);

  // subtle camera motion
  rotateY(sin(frameCount * 0.005) * 0.2);
  rotateX(sin(frameCount * 0.003) * 0.1);

  ambientLight(80);
  directionalLight(255, 255, 255, 0.2, 0.5, -1);

  for (let c of cells) {
    push();

    // breathing depth motion
    let zOffset = sin(frameCount * 0.02 + c.offset) * 30;

    translate(c.x, c.y, zOffset);

    texture(c.img);
    box(c.w * 0.95, c.h * 0.95, c.depth);

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
