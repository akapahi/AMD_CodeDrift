let movers = [];

let imagePaths = [
  "img.gif",
];

let images = [];

function preload() {
  for (let path of imagePaths) {
    images.push(loadImage(path));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
  createMover();
}

function draw() {
  background(220);

  // iterate backwards so we can safely remove
  for (let i = movers.length - 1; i >= 0; i--) {

    let m = movers[i];

    // update progress
    m.progress += m.speed * 0.009;

    // base linear position
    let x = lerp(m.sx, m.fx, m.progress);
    let y = lerp(m.sy, m.fy, m.progress);

    // direction vector
    let dx = m.fx - m.sx;
    let dy = m.fy - m.sy;
    let angle = atan2(dy, dx);

    // small perpendicular sine motion
    let amplitude = 5;          // VERY small wiggle
    let frequency = 16;          // how many waves along the path
    let offset = sin(m.progress * TWO_PI * frequency) * amplitude;

    // perpendicular direction
    let px = -sin(angle);
    let py = cos(angle);

    x += px * offset;
    y += py * offset;

    image(m.img, x, y, 100, 50);

    // remove when past end
    if (m.progress >= 1) {
      movers.splice(i, 1);
    }
  }
}

function createMover() {
  movers.push({
    sx: 0,
    sy: random(windowHeight),
    fx: windowWidth,
    fy: random(windowHeight),
    speed: random(1, 3),
    progress: 0,
    img: random(images)
  });
}
