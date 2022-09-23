import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #383636;
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`;

export { LoadingContainer, LoadingSpinner };
