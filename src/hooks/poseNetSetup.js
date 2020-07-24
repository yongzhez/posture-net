import { useEffect  } from 'react';
import * as posenet from "@tensorflow-models/posenet";

const usePoseNet = ({ videoRef, videoIsReady }) => {
    useEffect(() => {
        if (videoIsReady) {
          const setupAndStartModel = async () => {
            const poseNetModel = await posenet.load();
            const theThing = await poseNetModel.estimateSinglePose(videoRef.current, {
              flipHorizontal: false
            });
            console.log(theThing);
          }
          setupAndStartModel();
        }
      },[videoRef, videoIsReady])
}

export default usePoseNet;
