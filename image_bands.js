let bands = [];
let imagePaths = [
  "img1.gif",
];

let images = [];

function preload() {
  // Load all images before setup
  for (let path of imagePaths) {
    images.push(loadImage(path));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createBands();
}

function createBands() {
  bands = [];
  
  let x = 0;
  
  while (x < width) {
    let bandWidth = 100 //random(50, 150); // RANDOM WIDTH
    
    bands.push({
      x: x,
      w: bandWidth,
      speed: random(1, 3) * (random() > 0.5 ? 1 : -1),
      offset: random(1000),
      img: random(images)
    });
    
    x += bandWidth;
  }
}

function draw() {
  background(10);

  for (let band of bands) {
    band.offset += band.speed;

    let scaleFactor = band.w / band.img.width;
    let scaledH = band.img.height * scaleFactor;

    for (let y = -scaledH * 2; y < height + scaledH * 2; y += scaledH) {
      image(
        band.img,
        band.x,
        y + (band.offset % scaledH),
        band.w,
        scaledH
      );
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createBands(); // regenerate bands on resize
}
