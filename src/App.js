import React, { useRef, useEffect, useState } from "react";

import { usePoseNet, useWebCam, drawKeyPoints } from "./hooks/setup";
import { postureObserverHelper, POSTURE_ERROR_TYPES } from './hooks/postureObserver';

import LoadingSpinner from './component/LoadingSpinner';
import PageContainer from './component/PageContainer';
import { VIDEO_VARIABLES, MINIMUM_CONFIDENCE_SCORE, SECONDS_TO_ERROR } from './config.json';
import { sendNotification } from "./utilities/notification";


const Pose = ({
  isNotificationsGranted
}) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const keyPointsRef = useRef([]);
  const postureState = useRef([{ timeOutOfPosition: 0, ...POSTURE_ERROR_TYPES.DEFAULT },
    { timeOutOfPosition: 0, ...POSTURE_ERROR_TYPES.HEAD_TILT_LEFT },
    { timeOutOfPosition: 0, ...POSTURE_ERROR_TYPES.HEAD_TILT_RIGHT }]);

  const debugRef = useRef();

  const [startingPoints, setStartingPoints] = useState([]);
  const [postureError, setIsOutOfPostureError] = useState([]);

  // SETUP CAMERA
  const { videoIsReady, videoError } = useWebCam({ videoRef });

  // SETUP POSENET WHEN CAMERA IS READY
  const model = usePoseNet({ videoRef, videoIsReady });

  // ONLY WHEN CAMERA AND POSENET IS READY, START RECORDING POSES
  useEffect(() => {
    let requestId;

    function cleanUp() {
      cancelAnimationFrame(requestId)
    }

    if (videoIsReady && !!model) {
      const canvasContext = canvasRef.current.getContext("2d");
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
        debugRef.current.innerHTML = postureState.current[1].timeOutOfPosition;
        // remove stop based on error
        if (startingPoints.length > 0) {
          const postureCalc = postureObserverHelper({ keypoints: keyPointsRef.current, startingPoints });
          if (postureCalc.length === 0) {
            postureState.current = postureState.current.map(state => { return { ...state, timeOutOfPosition: 0 }});
            setIsOutOfPostureError([]);
          }
          else if (postureError.length === 0) {
            if (postureState.current.some(({ timeOutOfPosition }) => timeOutOfPosition === SECONDS_TO_ERROR)) {
              const errorSet = postureState.current.filter(({
                timeOutOfPosition
              }) => timeOutOfPosition === SECONDS_TO_ERROR );
              setIsOutOfPostureError(errorSet);
              if (isNotificationsGranted) {
                sendNotification(errorSet);
              }
            } else {
              postureState.current = postureState.current.map(state => {
                if (postureCalc.findIndex(({ type }) => state.type === type) > -1){
                  const updatedState = { ...state, timeOutOfPosition: state.timeOutOfPosition + 1 }
                  return updatedState;
                }
                return state;
              })
            }
          }
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
    <PageContainer>
      <LoadingSpinner videoIsReady={videoIsReady} isModelReady={!!model} />
      <video
        style={{ position: "fixed", zIndex: -1 }}
        ref={videoRef}
        autoPlay
      />
      <canvas
        width={VIDEO_VARIABLES.width}
        height={VIDEO_VARIABLES.height}
        ref={canvasRef}
      />
      <div ref={debugRef}/>
      {(videoIsReady || !!model) && (
        <div style={{ marginTop: "30px" }}>
          <button disabled={startingPoints.length > 0 && postureError.length === 0} onClick={() => {
            setIsOutOfPostureError([]);
            setStartingPoints(keyPointsRef.current);
            postureState.current = postureState.current.map(state => { return { ...state, timeOutOfPosition: 0 }});
          }}>
            Set starting points
          </button>
          <button onClick={() => {
            setStartingPoints([]);
          }}>
            Stop posture tracking
          </button>
          {postureError.length > 0 && (
            <div>
              <p>uh oh you're out of positions for the reasons below, when you're ready press the set starting points to reset</p>
              {postureError.map(({ message }, index) => (
                <div key={index}>
                  <p>{message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default Pose;
