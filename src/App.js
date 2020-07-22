import React, { useRef, useEffect, useState } from 'react';
// import posenet from '@tensorflow-models/posenet';


const Pose = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef();

  // const [userVideo, setUserVideo] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.log(err))
  },[]);

  // useEffect(() => {
  //   const net = async () => {
  //     setIsLoading(true);

  //     const blarg = await posenet.load({
  //       architecture: 'ResNet50',
  //       outputStride: 32,
  //       inputResolution: { width: 257, height: 257 },
  //       quantBytes: 2
  //     });
  //     const theThing = await net.estimateSinglePose(imageElement, {
  //       flipHorizontal: false
  //     });

  //     setIsLoading(false);
  //   }
  //   net();
  // },[])

  // if (isLoading) {
  //   return <div>it's loading</div>;
  // }
  return (
    <div>
       <video ref={videoRef} onCanPlay={() => videoRef.current.play()}></video>
    </div>
  );
}

export default Pose;
