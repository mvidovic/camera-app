// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger");
var ball = document.querySelector(".ball");
var garden = document.querySelector(".garden");
var output = document.querySelector(".output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

let y = 0;
window.addEventListener(
  "deviceorientation",
  function(e) {
    var z = e.alpha;
    var y = e.beta;
    var x = e.gamma;
    document.getElementById("beta").innerHTML = Math.round(y);
    document.getElementById("gamma").innerHTML = Math.round(x);
    document.getElementById("alpha").innerHTML = Math.round(z);

    if (y >= 87 && y <= 92) {
      setTimeout(() => {
        ball.style.top = (maxX * x) / 180 - 10 + "px";
        ball.style.left = (maxY * y) / 180 - 10 + "px";
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");
      }, 2000);
    }
  },
  true
);
if (y === 0) {
  setTimeout(() => {
    console.log("hello");
  }, 2000);
}

function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function(error) {
      console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

// Access the device camera and stream to cameraView

function handleOrientation(event) {
  var x = event.beta; // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  output.innerHTML = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
}

window.addEventListener("deviceorientation", handleOrientation);
