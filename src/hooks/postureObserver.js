const LIST_OF_BODY_PARTS = [
  "nose",
  "leftEye",
  "rightEye",
  "leftEar",
  "rightEar",
];

const isHeadTilted = ({
  keypoints,
  startingPoints,
  minPartConfidenceScore = 0.99,
  minSlopeDeviation = 5
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
  const slope = (filteredStartingPoints[0].position.y - filteredkeyPoints[0].position.y) / (filteredStartingPoints[0].position.x - filteredkeyPoints[0].position.x);
  if (slope > 1 && slope > minSlopeDeviation) {
    return [{ message: 'leaning to the left too much', type: 'headTilt'}];
  } else if (slope < -1 && slope > -minSlopeDeviation) {
    return [{ message: 'leaning to the right too much', type: 'headTilt' }];
  }

  return [];
};

export const postureObserverHelper = ({
  keypoints,
  startingPoints,
  minDeviationPercentage,
}) => {
  const filteredStartingPoints = startingPoints.filter(({ part }) =>
    LIST_OF_BODY_PARTS.includes(part)
  );

  const headTiltCalc = isHeadTilted({ keypoints, startingPoints });

  const isPostureFaulty = keypoints
    .filter(({ part }) => LIST_OF_BODY_PARTS.includes(part))
    .some((keypoint, index) => {
      if (filteredStartingPoints[index].part !== keypoint.part) {
        return true;
      }
      const xDiff = Math.abs(
        filteredStartingPoints[index].position.x - keypoint.position.x
      );
      const yDiff = Math.abs(
        filteredStartingPoints[index].position.y - keypoint.position.y
      );
      // use pythagorean theorem to get the true difference betwen points
      const difference = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      if (difference > minDeviationPercentage) {
        return true;
      }
      return false;
    }, []);

    const defaultCalc = isPostureFaulty ? [{ message: 'uh oh you\'re out of posture, click the "Set starting points" once you\'re back in posture to reset', type: 'default'}] : [];

  return [...headTiltCalc, ...defaultCalc];
};
