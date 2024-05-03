<!DOCTYPE html>
<html>
  <head>
    <style>
        body {
          margin: 0;
          padding: 0;
          background: grey;
        }

        .eye {
          width: 240px;
          height: 120px;
          background: #fff;
          display: inline-block;
          margin: 40px;
          border-radius: 80%;
          position: relative;
          overflow: hidden;
          -webkit-animation: blink 5s infinite;
        }

        .ball {
          width: 40px;
          height: 40px;
          background: #000;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          border: 15px solid #333;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/data/face-min.js"></script>
    <title>Face Tracking Eyes</title>
  </head>
  <body>
    <div class="eye" id="leftEye">
      <div class="ball"></div>
    </div>
    <div class="eye" id="rightEye">
      <div class="ball"></div>
    </div>
  
    <script>
      // Initialize face tracking
      var video = document.createElement('video');
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
        if (event.data.length === 0) {
          // No faces detected, reset eye position
          document.getElementById('leftEye').style.transform = 'translate(-50%,-50%)';
          document.getElementById('rightEye').style.transform = 'translate(-50%,-50%)';
        } else {
          // Get the first detected face
          var face = event.data[0];

          // Calculate average position of eyes
          var avgX = (face.x + face.width / 2);
          var avgY = (face.y + face.height / 2);

          // Set eye positions based on face position
          document.getElementById('leftEye').style.left = (avgX - 60) + 'px';
          document.getElementById('leftEye').style.top = (avgY - 30) + 'px';
          document.getElementById('rightEye').style.left = (avgX + 60) + 'px';
          document.getElementById('rightEye').style.top = (avgY - 30) + 'px';
        }
      });

      // Start video streaming
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          console.error('Error accessing the webcam: ', err);
        });
    </script>
  </body>
</html>
