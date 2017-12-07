var orbitCenterX = 500;
var orbitCenterY = 450;
var orbitRadius = 200;
var orbitAngle = 0;
var orbitSpeed = 0.025;

var oppositeCenterX = 1996;
var oppositeCenterY = 450;
var oppositeAngle = 3.14;

var distanceSlider;
var distanceStar;

function setup() {
  createCanvas(1920, windowHeight);

  distanceSlider = createSlider(0, 20, 0);
  distanceSlider.position(50,40);
  distanceSlider.class("sim-slider");
}


function draw() {
  background(0);
  
  /* Distance Slider Label */
  textSize(16);
  text("Star Distance", distanceSlider.x, distanceSlider.y - 10);
  fill(255);

  /* Set Distance Slider value and increments */
  distanceStar = distanceSlider.value() * 0.01 + 1;

  /* Create Orbits */
  var x = orbitCenterX + orbitRadius * cos(orbitAngle);
  var y = orbitCenterY + orbitRadius * sin(orbitAngle);

  var x1 = oppositeCenterX + orbitRadius * cos(oppositeAngle);
  var y1 = oppositeCenterY + orbitRadius * sin(oppositeAngle);

  var starX = (((x1 * distanceStar) + x )) / 2 //calculates the center of the line (x) 
  var starY = (y1 + y) / 2; // actually 450

  orbitAngle += orbitSpeed;
  oppositeAngle += orbitSpeed;

  /* Parallax */
  push();
  frameRate(30);
  stroke(255); 
  line(x, y, x1 * distanceStar, y1); //makes the line expand according to the slider
  pop();

  /* Sun */
  push();
  textSize(20);
  fill(255);
  text("Sun", 480, 420);
  fill(0);
  pop();

  push();
  fill(250, 250, 40);
  ellipse(orbitCenterX, orbitCenterY, 50, 50);
  pop();

  /* Earth */
  push();
  fill(30, 144, 255);
  ellipse(x, y, 20, 20);
  pop();

  /* Observation Star */
  push();
  translate(starX, starY); //changes the position of the star according to the values of starX kai starY
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

  /* Background Stars */
  push();
  translate(width*0.9, height*0.1);
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

  push();
  translate(width*0.9, height*0.28);
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

  push();
  translate(width*0.9, orbitCenterY);
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

  push();
  translate(width*0.9, orbitCenterY*1.38);
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

  push();
  translate(width*0.9, orbitCenterY*1.8);
  rotate(frameCount / -100.0);
  star(0, 0, 10, 20, 5); 
  pop();

}

/* Start rotation */
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}