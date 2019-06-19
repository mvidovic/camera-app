// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

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

    window.addEventListener("deviceorientation", function(e) {
        var z = Math.round(e.alpha);
        var y = Math.round(e.beta);
        var x = Math.round(e.gamma);
       document.getElementById('beta').innerHTML = y;
        document.getElementById('gamma').innerHTML = x;
        document.getElementById('alpha').innerHTML = z;
        
        if( y >= 85 && y <= 95) {
            cameraTrigger.onclick = function() {
            cameraSensor.width = cameraView.videoWidth;
            cameraSensor.height = cameraView.videoHeight;
            cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
            cameraOutput.src = cameraSensor.toDataURL("image/webp");
            cameraOutput.classList.add("taken");
        };
        // Start the video stream when the window loads
        window.addEventListener("load", cameraStart, false);}
    }, true);

     
        
        // Take a picture when cameraTrigger is tapped
        

     


      
// Access the device camera and stream to cameraView
