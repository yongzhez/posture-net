import React, { useRef, useEffect, useState } from 'react';
import usePoseNet from './hooks/poseNetSetup';

const Pose = () => {
  const videoRef = useRef();
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [videoError, setVideoError] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => setVideoError(err))
  },[]);

  usePoseNet({ videoRef, videoIsReady });

  if (videoError) {
    return <div>there was an error loading, make sure your browser supports webcam or that your webcam is turned on</div>
  }

  return (
    <div>
       <video ref={videoRef} onCanPlay={() => {
         videoRef.current.play();
         setVideoIsReady(true);
       }}></video>
    </div>
  );
}

export default Pose;
