import styled from "styled-components";

export const WrapperLayoutCenter = styled.div`
  max-width: ${({ theme }) => theme?.screen?.tablet};
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;
