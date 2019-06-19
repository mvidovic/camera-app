// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, true);
      } else {
        document.getElementById("dmEvent").innerHTML = "Not supported."
      }

      function deviceMotionHandler(eventData) {
        var info, xyz = "[X, Y, Z]";
      
        // Grab the acceleration from the results
        var acceleration = eventData.acceleration;
        info = xyz.replace("X", acceleration.x);
        info = info.replace("Y", acceleration.y);
        info = info.replace("Z", acceleration.z);
        document.getElementById("moAccel").innerHTML = info;
      
        // Grab the acceleration including gravity from the results
        acceleration = eventData.accelerationIncludingGravity;
        info = xyz.replace("X", acceleration.x);
        info = info.replace("Y", acceleration.y);
        info = info.replace("Z", acceleration.z);
        document.getElementById("moAccelGrav").innerHTML = info;
      
        // Grab the rotation rate from the results
        var rotation = eventData.rotationRate;
        info = xyz.replace("X", rotation.alpha);
        info = info.replace("Y", rotation.beta);
        info = info.replace("Z", rotation.gamma);
        document.getElementById("moRotation").innerHTML = info;
      
        // // Grab the refresh interval from the results
        info = eventData.interval;
        document.getElementById("moInterval").innerHTML = info;       
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
        cameraTrigger.onclick = function() {
            cameraSensor.width = cameraView.videoWidth;
            cameraSensor.height = cameraView.videoHeight;
            cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
            cameraOutput.src = cameraSensor.toDataURL("image/webp");
            cameraOutput.classList.add("taken");
        };
        // Start the video stream when the window loads
        window.addEventListener("load", cameraStart, false);

     


      
// Access the device camera and stream to cameraView
