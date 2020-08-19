import { useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { VIDEO_VARIABLES, KEYPOINT_CONFIDENCE } from '../config.json';


const setupAndStartModel = async (
  setPoseNet: (val: posenet.PoseNet) => void
) => {
  const poseNetModel = await posenet.load();
  setPoseNet(poseNetModel);
};

export const usePoseNet = (
  videoIsReady: boolean
): posenet.PoseNet | undefined => {
  const [poseNet, setPoseNet] = useState<posenet.PoseNet | undefined>(undefined);

  useEffect(() => {
    if (videoIsReady) {
      setupAndStartModel(setPoseNet);
    }
  }, [videoIsReady]);
  return poseNet;
};

interface WebCamState {
  videoError: string,
  videoIsReady: boolean
}

export const useWebCam = (
  videoElement: React.MutableRefObject<HTMLVideoElement | null>
): WebCamState => {
  const [videoError, setVideoError] = useState('');
  const [videoIsReady, setVideoIsReady] = useState(false);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const element = videoElement?.current;
        if (element) {
          element.srcObject = stream;
          element.onloadedmetadata = function () {
            element.play();
            setVideoIsReady(true);
          };
          element.width = VIDEO_VARIABLES.width;
          element.height = VIDEO_VARIABLES.height;
        }
      })
      .catch((err: string) => setVideoError(err));
    // reasoning: need to only render on mount or else it'll keep trying to grab the user's media
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videoError, videoIsReady };
}

export const drawKeyPoints = (
  keypoints: posenet.Keypoint[],
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

