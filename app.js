// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
 
    var ball   = document.querySelector('.ball');
    var garden = document.querySelector('.garden');
    var output = document.querySelector('.output');

    var maxX = garden.clientWidth  - ball.clientWidth;
    var maxY = garden.clientHeight - ball.clientHeight;
       
        window.addEventListener("deviceorientation", function(e) {
            var z = e.alpha;
            var x = e.beta;
            var y = e.gamma;
            document.getElementById('beta').innerHTML = Math.round(y);
            document.getElementById('gamma').innerHTML = Math.round(x);
            document.getElementById('alpha').innerHTML = Math.round(z);
            console.log("test", y);
            output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

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
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";

            if ( x < 92 && x > 87) {
                console.log('uspela si')
                cameraTrigger.onclick = function() {
                    cameraSensor.width = cameraView.videoWidth;
                    cameraSensor.height = cameraView.videoHeight;
                    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
                    cameraOutput.src = cameraSensor.toDataURL("image/webp");
                    cameraOutput.classList.add("taken");
                };
                
              } else {
               console.log('nisi')
              }
            
        }, true);
     

    

    
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
