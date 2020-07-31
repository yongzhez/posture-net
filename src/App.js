import React, { useRef, useEffect, useState } from "react";
import usePoseNet, { drawKeyPoints } from "./hooks/poseNetSetup";
import { postureObserverHelper } from './hooks/postureObserver';

import { VIDEO_VARIABLES, MINIMUM_CONFIDENCE_SCORE } from './config.json';

const Pose = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const keyPointsRef = useRef([]);

  const [startingPoints, setStartingPoints] = useState([]);
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [videoError, setVideoError] = useState(null);

  // SETUP CAMERA
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment", frameRate: { ideal: 30, max: 30 } } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => setVideoError(err));
  }, []);

  // SETUP POSENET WHEN CAMERA IS READY
  const model = usePoseNet({ videoRef, videoIsReady });

  // ONLY WHEN CAMERA AND POSENET IS READY, START RECORDING POSES
  useEffect(() => {
    let requestId;
    const canvasContext = canvasRef.current.getContext("2d");

    function cleanUp() {
      cancelAnimationFrame(requestId)
    }

    if (videoIsReady && !!model) {
      const estimate = async () => {
        const { keypoints, score } = await model.estimateSinglePose(videoRef.current,{ flipHorizontal: false });
        canvasContext.drawImage(
          videoRef.current,
          0,
          0,
          VIDEO_VARIABLES.width,
          VIDEO_VARIABLES.height
        );
        if (score >= MINIMUM_CONFIDENCE_SCORE) {
          keyPointsRef.current = keypoints;
          drawKeyPoints(keypoints, canvasContext);
        }
        if (startingPoints.length > 0) {
          let isPostureOkay = postureObserverHelper({ keypoints: keyPointsRef.current, startingPoints, minDeviationPercentage: 40});
          console.log(isPostureOkay);
        }
      };

      function animate() {
        estimate();
        requestId = requestAnimationFrame(animate);
      }
      requestId = requestAnimationFrame(animate);
    }
    return cleanUp;
  });

  if (videoError) {
    console.log(videoError);
    return (
      <div>
        there was an error loading, make sure your browser supports webcam or
        that your webcam is turned on
      </div>
    );
  }

  return (
    <div>
      <video
        width={VIDEO_VARIABLES.width}
        height={VIDEO_VARIABLES.height}
        ref={videoRef}
        display="none"
        onCanPlay={() => {
          videoRef.current.play();
          setVideoIsReady(true);
        }}
      ></video>
      <div>
        <canvas
          width={VIDEO_VARIABLES.width}
          height={VIDEO_VARIABLES.height}
          ref={canvasRef}
          id="c1"
        ></canvas>
      </div>
      <button onClick={() => {
        setStartingPoints(keyPointsRef.current);
      }}>
        Set starting points
      </button>
      <button onClick={() => {
        setStartingPoints([]);
      }}>
        Stop posture tracking
      </button>
    </div>
  );
};

export default Pose;
