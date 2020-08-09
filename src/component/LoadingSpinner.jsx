import React from "react";

import styled, { keyframes } from "styled-components";

// credit to https://loading.io/css/

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 80px;
  height: 80px;
  margin-top: 10%;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

const LoadingContainer = styled.div`
  z-index: 1;
  height: 100vh;
  width: 100vw;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default ({ videoIsReady, isModelReady }) => {

  const renderLoadingMessage = (videoIsReady, isModelReady) => {
    if (!videoIsReady && !isModelReady) {
        return "preparing webcam";
    } else if (videoIsReady && !isModelReady) {
        return "loading pose model";
    } else {
        return "";
    }
  };

  if (videoIsReady && isModelReady) {
    return null;
  }

  return (
    <LoadingContainer>
      <LoadingSpinner />
      <p>{renderLoadingMessage(videoIsReady, isModelReady)}</p>
    </LoadingContainer>
  );
};
