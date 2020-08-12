import { useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { VIDEO_VARIABLES, KEYPOINT_CONFIDENCE } from '../config.json';

const setupAndStartModel = async setPoseNet => {
  const poseNetModel = await posenet.load();
  setPoseNet(poseNetModel);
};

export const usePoseNet = ({ videoRef, videoIsReady }) => {
  const [poseNet, setPoseNet] = useState(null);
  useEffect(() => {
    if (videoIsReady) {
      setupAndStartModel(setPoseNet);
    }
  }, [videoRef, videoIsReady]);
  return poseNet;
};

export const useWebCam = ({ videoRef }) => {
  const [videoError, setVideoError] = useState(null);
  const [videoIsReady, setVideoIsReady] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment", video: { width: VIDEO_VARIABLES.width, height: VIDEO_VARIABLES.height} } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = function(e) {
          videoRef.current.play();
          setVideoIsReady(true);
        };
        videoRef.current.width = VIDEO_VARIABLES.width;
        videoRef.current.height = VIDEO_VARIABLES.height;
      })
      .catch((err) => setVideoError(err));
  // reasoning: need to only render on mount or else it'll keep trying to grab the user's media
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videoError, videoIsReady };
}

export const drawKeyPoints = (
  keypoints,
  canvasRef,
  skeletonColor = "green"
) => {
  keypoints.forEach((keypoint) => {
    if (keypoint.score >= KEYPOINT_CONFIDENCE) {
      const { x, y } = keypoint.position;
      canvasRef.beginPath();
      canvasRef.arc(x, y, 4, 0, 2 * Math.PI, false)
      canvasRef.fillStyle = skeletonColor;
      canvasRef.fill();
    }
  });
};

