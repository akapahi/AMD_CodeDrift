// p5 » hydra - typo cos/sin
// pass p5 typography into hydra
// cc teddavis.org 2024

s0.initP5() // send p5 to hydra
P5.toggle(0) // hide p5
//H.hide()
H.pixelDensity(2) // set res

src(s0)
.pixelate(()=>30*sin(time), ()=>30*cos(time))
.add(src(o0).scale(()=>1-cos(time)/2), .4)
.add(src(o0).scale(()=>1+sin(time)/2), .4)
.modulateScale(noize(1000), .03)
.out()

var x = 0;
var dir = 1;
var speed = 0;
var acc = 0.1;
var maxSpeed;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	rectMode(CENTER);
	colorMode(HSB, 360,255,255);
	maxSpeed = (Math.min(height, width) / 4) * 2 * acc;
	maxSpeed = Math.sqrt(maxSpeed);
	
}

function draw() {
	background(0);
	translate(width/2, height/2);
	rotate(radians(frameCount));
	
	for(var i =0; i < 8; i++){
    push();
    //this means that we are dividing 360 degrees into
    //8 portions
    rotate(TWO_PI * i / 8);
		translate(x, 0);
    
    rectMode(CENTER);
		rotate(radians(frameCount*2));
		fill((x+(i*45))%360, 255, 255);
		noStroke();
		rect(0, 0, 40, 40);
    pop();
  }
	
	
	speed= sin(radians(frameCount))*maxSpeed/2;
	x+= speed*dir;
//	if(speed > maxSpeed){
	//	console.log("speed: " + speed );
	//	console.log("x: " + x);
//		acc = -acc;
//	}
	//if(speed < 0 ){
	//	acc = -acc;
	//	dir = -dir;
//	}
}
