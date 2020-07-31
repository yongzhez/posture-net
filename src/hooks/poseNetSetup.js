import { useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { VIDEO_VARIABLES, KEYPOINT_CONFIDENCE } from '../config.json';

const setupAndStartModel = async setPoseNet => {
  const poseNetModel = await posenet.load({
    architecture: "ResNet50",
    outputStride: 32,
    inputResolution: VIDEO_VARIABLES,
    quantBytes: 2,
  });
  setPoseNet(poseNetModel);
};

const usePoseNet = ({ videoRef, videoIsReady }) => {
  const [poseNet, setPoseNet] = useState(null);
  useEffect(() => {
    if (videoIsReady) {
      setupAndStartModel(setPoseNet);
    }
  }, [videoRef, videoIsReady]);
  return poseNet;
};

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

export default usePoseNet;
