import React, { useRef, useEffect, useState } from 'react';
import usePoseNet from './hooks/poseNetSetup';

const Pose = () => {
  const videoRef = useRef();
  const [videoIsReady, setVideoIsReady] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.log(err))
  },[]);

  usePoseNet({ videoRef, videoIsReady });

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
