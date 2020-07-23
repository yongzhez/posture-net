import React, { useRef, useEffect, useState } from 'react';
import * as posenet from "@tensorflow-models/posenet";

const Pose = () => {
  const [videoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.log(err))
  },[]);

  useEffect(() => {
    if (videoReady) {
      const setupAndStartModel = async () => {
        const poseNetModel = await posenet.load();
        debugger;
        const theThing = await poseNetModel.estimateSinglePose(videoRef.current, {
          flipHorizontal: false
        });
        console.log(theThing);
      }
      setupAndStartModel();
    }
  },[videoReady])

  return (
    <div>
       <video ref={videoRef} onCanPlay={() => {
         videoRef.current.play();
         setIsVideoReady(true);
       }}></video>
    </div>
  );
}

export default Pose;
