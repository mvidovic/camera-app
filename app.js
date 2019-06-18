// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")


    if (!('ondeviceorientation' in window)) {
        document.getElementById('do-unsupported').classList.remove('hidden');
     }else {document.getElementById('do-info').classList.remove('hidden');

     window.addEventListener('deviceorientation', function(event) {
        document.getElementById('beta').innerHTML = Math.round(event.beta);
        document.getElementById('gamma').innerHTML = Math.round(event.gamma);
        document.getElementById('alpha').innerHTML = Math.round(event.alpha);
         console.log(event);
     });
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
