import styled from "styled-components";

import { Oval } from 'react-loader-spinner';

export default function Loading() {
  return (
    <LoadingStyle>
      <Oval ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={7}
        strokeWidthSecondary={5}
        color="#333333"
        secondaryColor="white" />
    </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;