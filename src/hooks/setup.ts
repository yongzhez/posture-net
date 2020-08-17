import { useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { VIDEO_VARIABLES, KEYPOINT_CONFIDENCE } from '../config.json';

const setupAndStartModel = async (setPoseNet: React.Dispatch<React.SetStateAction<posenet.PoseNet | null>>) => {
  const poseNetModel: posenet.PoseNet = await posenet.load();
  setPoseNet(poseNetModel);
};

export const usePoseNet = (videoRef: HTMLVideoElement | null | undefined, videoIsReady: boolean): posenet.PoseNet | null => {
  const [poseNet, setPoseNet] = useState<posenet.PoseNet | null>(null);
  useEffect(() => {
    if (videoIsReady) {
      setupAndStartModel(setPoseNet);
    }
  }, [videoRef, videoIsReady]);
  return poseNet;
};

interface WebCamState {
  videoError: string,
  videoIsReady: boolean
}

export const useWebCam = (videoRef: HTMLVideoElement | null | undefined): WebCamState => {
  const [videoError, setVideoError] = useState<string>('');
  const [videoIsReady, setVideoIsReady] = useState<boolean>(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        debugger;
        if (videoRef) {
          videoRef.srcObject = stream;
          videoRef.onloadedmetadata = function (e) {
            videoRef.play();
            setVideoIsReady(true);
          };
          videoRef.width = VIDEO_VARIABLES.width;
          videoRef.height = VIDEO_VARIABLES.height;
        }
      })
      .catch((err: string) => setVideoError(err));
    // reasoning: need to only render on mount or else it'll keep trying to grab the user's media
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videoError, videoIsReady };
}

export const drawKeyPoints = (
  keypoints: Array<posenet.Keypoint>,
  canvasRef: CanvasRenderingContext2D,
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

