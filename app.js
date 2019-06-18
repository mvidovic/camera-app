// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")


    if (!('ondevicemotion' in window)) {
        document.getElementById('dm-unsupported').classList.remove('hidden');
     } else {
        document.getElementById('dm-info').classList.remove('hidden');

        window.addEventListener('devicemotion', function(event) {
           document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
           document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
           document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

           document.getElementById('acceleration-including-gravity-x').innerHTML =
                   Math.round(event.accelerationIncludingGravity.x);
           document.getElementById('acceleration-including-gravity-y').innerHTML =
                   Math.round(event.accelerationIncludingGravity.y);
           document.getElementById('acceleration-including-gravity-z').innerHTML =
                   Math.round(event.accelerationIncludingGravity.z);

           document.getElementById('rotation-rate-beta').innerHTML = Math.round(event.rotationRate.beta);
           document.getElementById('rotation-rate-gamma').innerHTML = Math.round(event.rotationRate.gamma);
           document.getElementById('rotation-rate-alpha').innerHTML = Math.round(event.rotationRate.alpha);

           document.getElementById('interval').innerHTML = event.interval;
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
