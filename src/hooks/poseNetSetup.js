import { useEffect  } from 'react';
import * as posenet from "@tensorflow-models/posenet";

const setupAndStartModel = async (videoRef) => {
    const poseNetModel = await posenet.load();
    const theThing = await poseNetModel.estimateSinglePose(videoRef.current, {
      flipHorizontal: false
    });
    console.log(theThing);
  }

const usePoseNet = ({ videoRef, videoIsReady }) => {
    useEffect(() => {
        if (videoIsReady) {
          setupAndStartModel(videoRef);
        }
      },[videoRef, videoIsReady])
}

export default usePoseNet;
