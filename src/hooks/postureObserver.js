
export const postureObserverHelper = ({
    keypoints,
    startingPoints,
    minDeviationPercentage
}) => {
    let isPostureFaulty =  keypoints.some((keypoint,index) => {
        if (startingPoints[index].part !== keypoint.part) {
            return true;
        }
        const difference = Math.sqrt(startingPoints.position.x^2 + startingPoints.position.y^2)
        if (difference > minDeviationPercentage) {
            return true;
        }
        return false;
    },[])
    return isPostureFaulty;
}