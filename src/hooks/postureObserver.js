
const LIST_OF_BODY_PARTS = [
    "nose",
    "leftEye",
    "rightEye",
    "leftEar",
    "rightEar"
]

export const postureObserverHelper = ({
    keypoints,
    startingPoints,
    minDeviationPercentage
}) => {
    const filteredStartingPoints = startingPoints.filter(({ part }) => LIST_OF_BODY_PARTS.includes(part))
    const isPostureFaulty =  keypoints
    .filter(({ part }) => LIST_OF_BODY_PARTS.includes(part))
    .some((keypoint,index) => {
        if (filteredStartingPoints[index].part !== keypoint.part) {
            return true;
        }
        const xDiff = Math.abs(filteredStartingPoints[index].position.x - keypoint.position.x);
        const yDiff = Math.abs(filteredStartingPoints[index].position.y - keypoint.position.y);
        // use pythagorean theorem to get the true difference betwen points
        const difference = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
        if (difference > minDeviationPercentage) {
            return true;
        }
        return false;
    },[])
    return !isPostureFaulty;
}