// p5 » hydra
// pass p5 into hydra
// cc teddavis.org 2024

s0.initP5() // send p5 to hydra
P5.toggle(0) // optionally hide p5
//H.hide()
H.pixelDensity(2) // 2x retina

src(s0)
//.pixelate(()=>30*sin(time), ()=>30*cos(time))
//.add(src(o0).scale(()=>1-cos(time)/2), .4)
//.add(src(o0).scale(()=>1+sin(time)/2), .4)
//.modulateScale(noize(1000), .03)
.kaleid(09.56)
.rotate( () => time%360 )
.modulateHue(src(o0).scale(1.01),1)
.out()


let theme = ["pink", "#9c5ecb", "aquamarine", "#fdfd96", "skyblue"]

let a = [];

let rows, cols;
let side = 40;
let i = 0, j = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  cols = Math.floor(windowWidth/side);
  rows = Math.floor(windowHeight/side);
  // for(var i = 0; i< cols; i++){
  //   for(var j = 0; j < rows; j++){
  //     a.push(new Arch(i*side + 10, j * side + 10, random(0.01,0.02)))
  //   }
  // }

}

function draw() {
  background(220);
  a.forEach((i) => {i.show()})
  if(frameCount%10==0 && i<cols){
    a.push(new Arch(i*side + 10, j * side + 10, random(0.01,0.02)))
    j++;
    if(j>=rows){
      j=0;
      i++;
    }
  }
}

class Arch {
  constructor(x, y, speed,sc=5) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sc = sc;
    
    this.p = random(-10, 60);
    this.o = random(-50, 40);
    this.h = random(50, 200);
    this.oc = random(theme);

    this.op = random(-10, 60);
    this.oo = random(-50, 40);
    this.oh = random(50, 200);
    this.c = random(theme);
    this.f = 0;
  }

  randomize() {
    this.op = this.p;
    this.oh = this.h;
    this.oc = this.c;
    this.oo = this.o;
    this.p = random(-10, 60);
    this.o = random(-50, 40);
    this.h = random(50, 200);
    this.c = random(theme);
    this.f = 0;
  }
  
  show(){
    if(this.f>=1) this.randomize();
    let cp = lerp(this.op, this.p, this.f);
    let co = lerp(this.oo, this.o, this.f);
    let ch = lerp(this.oh, this.h, this.f);
    let cc = lerpColor(color(this.oc),color(this.c),this.f)
    this.drawArch(this.x,this.y, cp, co, ch,cc);
    this.f+=this.speed;
  }
  
  drawArch(x, y, pointyness, onionness, h , col){
  push();
  translate(x,y);
  fill(col)
  
  beginShape();
  vertex(0,0 - pointyness/this.sc);
  bezierVertex(20/this.sc,10/this.sc,100/this.sc,10/this.sc,(100+onionness)/this.sc,60/this.sc);
  vertex((100+onionness)/this.sc,(h + 60)/this.sc);
  vertex((-100-onionness)/this.sc,(h + 60)/this.sc);
  vertex((-100-onionness)/this.sc,60/this.sc)
  bezierVertex(-100/this.sc,10/this.sc,-20/this.sc,10/this.sc,0,0-pointyness/this.sc);
  endShape()
  pop();
}

}
