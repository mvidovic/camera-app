// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    
       
        window.addEventListener(
  "deviceorientation",
  function(e) {
    var z = e.alpha;
    var y = e.beta;
    var x = e.gamma;
    document.getElementById("beta").innerHTML = Math.round(y);
    document.getElementById("gamma").innerHTML = Math.round(x);
    document.getElementById("alpha").innerHTML = Math.round(z);

    if (y >= 87 && y < 92) {
      console.log("uspela si");
      this.setTimeout(() => {
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
