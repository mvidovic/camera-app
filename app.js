// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger");

var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var y = event.beta;  // In degree in the range [-180,180]
  var x = event.gamma; // In degree in the range [-90,90]

    y = Math.round(y);
   x = Math.round(x);
  console.log(y, 'y');
  console.log(x, 'x');
  output.innerHTML  = "beta : " + y + "\n";
  output.innerHTML += "gamma: " + x + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.left  = (maxX*x/180 - 20) + "px";
  ball.style.top = ((maxY*y/180) / 2 - 20) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);

// window.addEventListener(
//   "deviceorientation",
//   function(e) {
//     var z = e.alpha;
//     var y = e.beta;
//     var x = e.gamma;
//     document.getElementById("beta").innerHTML = Math.round(y);
//     document.getElementById("gamma").innerHTML = Math.round(x);
//     document.getElementById("alpha").innerHTML = Math.round(z);

//     if (y >= 87 && y <= 92) {
//       console.log("uspela si");
//       setTimeout(() => {
//         cameraSensor.width = cameraView.videoWidth;
//         cameraSensor.height = cameraView.videoHeight;
//         cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
//         cameraOutput.src = cameraSensor.toDataURL("image/webp");
//         cameraOutput.classList.add("taken");
//       }, 2000);
//     }
//   },
//   true
// );

// function cameraStart() {
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function(stream) {
//       track = stream.getTracks()[0];
//       cameraView.srcObject = stream;
//     })
//     .catch(function(error) {
//       console.error("Oops. Something is broken.", error);
//     });
// }
// // Take a picture when cameraTrigger is tapped

// // Start the video stream when the window loads
// window.addEventListener("load", cameraStart, false);

// // Access the device camera and stream to cameraView



