// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    
    var Accelerometer = function() {
        var self = this;
        self.supported = false;
        var absolute = null,
            alpha = null,
            beta = null,
            gamma = null;

            self.getAlpha = function() {
                return (alpha !== null) ? alpha : 0;
              };
              self.getBeta = function() {
                return (beta !== null) ? beta : 0;
              };
              self.getGamma = function() {
                return (gamma !== null) ? gamma : 0;
            };

            if (!!window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", handleOrientation, true);
                self.supported = true;
            }

            function handleOrientation(event) {
                absolute = Math.round(event.absolute);
                alpha = Math.round(event.alpha);
                beta = Math.round(event.beta);
                gamma = Math.round(event.gamma);
                document.getElementById('beta').innerHTML = Math.round(event.beta);
               document.getElementById('gamma').innerHTML = Math.round(event.gamma);
               document.getElementById('alpha').innerHTML = Math.round(event.alpha);
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
