import React, { useRef, useEffect, useState } from 'react';
import usePoseNet, { drawKeyPoints } from './hooks/poseNetSetup';

const Pose = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [videoError, setVideoError] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => setVideoError(err))
  },[]);

  const model = usePoseNet({ videoRef, videoIsReady });

  useEffect(() => {
    if (videoIsReady && !!model) {
      const animate = async () => {
        const canvasContext = canvasRef.current.getContext('2d');
        canvasContext.drawImage(videoRef.current, 0, 0, 640, 360);

        const { keypoints, score } = await model.estimateSinglePose(videoRef.current, {
          flipHorizontal: false
        });
        if (score >= 0.39) {
          drawKeyPoints(
            keypoints,
            canvasContext
          )
        }
        setTimeout(function() {
          animate();
        }, 0);
      }
      animate();
    }
  })

  if (videoError) {
    console.log(videoError);
    return <div>there was an error loading, make sure your browser supports webcam or that your webcam is turned on</div>
  }

  return (
    <div>
       <video width="640" height="360" ref={videoRef} onCanPlay={() => {
         videoRef.current.play();
         setVideoIsReady(true);
       }}></video>
       <div>
        <canvas ref={canvasRef} id="c1" width="640" height="360"></canvas>
      </div>
    </div>
  );
}

export default Pose;
