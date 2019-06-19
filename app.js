// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    
    window.addEventListener("deviceorientation", handleOrientation, true);

    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha    = event.alpha;
        var beta     = event.beta;
        var gamma    = event.gamma;
      
        document.getElementById('beta').innerHTML = Math.round(beta);
        document.getElementById('gamma').innerHTML = Math.round(gamma);
        document.getElementById('alpha').innerHTML = Math.round(alpha);
        // Do stuff with the new orientation data

        if ( beta > 85) {
            cameraTrigger.onclick = function() {
                cameraSensor.width = cameraView.videoWidth;
                cameraSensor.height = cameraView.videoHeight;
                cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
                cameraOutput.src = cameraSensor.toDataURL("image/webp");
                cameraOutput.classList.add("taken");
            };
        }
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
