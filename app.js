// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")


    

    
    window.addEventListener("deviceorientation", onDeviceOrientationChange, false);
    function usefulOrientation(alpha, beta, gamma){
        alpha -= window.orientation;
        while(alpha < 0) alpha += 360;
        while(alpha > 360) alpha -= 360;
        if(window.orientation === 180){
            return {alpha: alpha,
                beta: -beta,
                gamma: -gamma};
        }else if(window.orientation === 90){
            return {alpha: alpha,
                beta: -gamma,
                gamma: beta};
        }else if(window.orientation === -90){
            return {alpha: alpha,
                beta: gamma,
                gamma: -beta};
        }else{
            return {alpha: alpha,
                beta: beta,
                gamma: gamma};
        }
    }

    
    function onDeviceOrientationChange(e){
        console.log("deviceOrientation", e.alpha, e.beta, e.gamma);
        var orientation = usefulOrientation(e.alpha, e.beta, e.gamma);
        console.log("usefulOrientatino", orientation.alpha, orientation.beta, orientation.gamma);
    }
      
// Access the device camera and stream to cameraView
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
