var img = "";
var model_status = "";
var objects = [];

function preload() {
  img = loadImage('hi.jpg');
}

function setup() {
  canvas = createCanvas(1000, 600);
  canvas.center();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById('status').innerHTML = "status: Detecting baby";
}

function modelLoaded() {
  console.log('model loaded');
  model_status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(img, 0, 0, 1000, 600);
  if (model_status != "") {
    objectDetector.detect(img, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById('status').innerHTML = "Status: Detected baby";
      console.log('hi' + i);
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
      noFill();
      stroke('red');
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}