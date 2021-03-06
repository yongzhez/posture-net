const LIST_OF_BODY_PARTS = [
  "nose",
  "leftEye",
  "rightEye",
  "leftEar",
  "rightEar",
];

export const POSTURE_ERROR_TYPES = {
  HEAD_TILT_RIGHT: { message: 'leaning to the right too much', shortMessage: 'leaning right', type: 'HEAD_TILT_RIGHT' },
  HEAD_TILT_LEFT: { message: 'leaning to the left too much', shortMessage: 'leaning left', type: 'HEAD_TILT_LEFT' },
  DEFAULT: { message: 'you\'ve moved too far from the starting points ', shortMessage: 'out of position', type: 'DEFAULT'}
}

const isHeadTilted = ({
  keypoints,
  startingPoints,
  minPartConfidenceScore = 0.99,
  minDiff = 5
}) => {
  const filteredStartingPoints = startingPoints.filter(({ part }) =>
    ["leftEye", "rightEye"].includes(part)
  );

  const filteredkeyPoints = keypoints.filter(({ part }) => ["leftEye", "rightEye"].includes(part))

  // check confidence for both eyes
  if (filteredkeyPoints.some(({ score }) => score < minPartConfidenceScore)) {
    return [{ message: 'confidence score for eyes not met', type: 'headTilt' }]
  }

  // only need to look at one of the 2 eyes
  // const slope = (filteredStartingPoints[0].position.y - filteredkeyPoints[0].position.y) / (filteredStartingPoints[0].position.x - filteredkeyPoints[0].position.x);
  // console.log(`y1: ${filteredStartingPoints[0].position.y}, y2: ${filteredkeyPoints[0].position.y}, x1 ${filteredStartingPoints[0].position.x}, x2 ${filteredkeyPoints[0].position.x}`)
  // console.log(slope);
  const xDiff = filteredStartingPoints[0].position.x - filteredkeyPoints[0].position.x
  if (xDiff > 0 && Math.abs(xDiff) > minDiff) {
    return [POSTURE_ERROR_TYPES.HEAD_TILT_RIGHT];
  } else if (xDiff < 0 && Math.abs(xDiff) > minDiff) {
    return [POSTURE_ERROR_TYPES.HEAD_TILT_LEFT];
  }

  return [];
};

export const postureObserverHelper = ({
  keypoints,
  startingPoints,
  minDeviationPercentage = 40,
}) => {
  // const filteredStartingPoints = startingPoints.filter(({ part }) =>
  //   LIST_OF_BODY_PARTS.includes(part)
  // );

  const headTiltCalc = isHeadTilted({ keypoints, startingPoints });

  // const isPostureFaulty = keypoints
  //   .filter(({ part }) => LIST_OF_BODY_PARTS.includes(part))
  //   .some((keypoint, index) => {
  //     if (filteredStartingPoints[index].part !== keypoint.part) {
  //       return true;
  //     }
  //     const xDiff = Math.abs(
  //       filteredStartingPoints[index].position.x - keypoint.position.x
  //     );
  //     const yDiff = Math.abs(
  //       filteredStartingPoints[index].position.y - keypoint.position.y
  //     );
  //     // use pythagorean theorem to get the true difference betwen points
  //     const difference = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  //     if (difference > minDeviationPercentage) {
  //       return true;
  //     }
  //     return false;
  //   }, []);

  //   const defaultCalc = isPostureFaulty ? [POSTURE_ERROR_TYPES.DEFAULT] : [];

  return [...headTiltCalc];
};
