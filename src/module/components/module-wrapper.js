import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 1rem;
`;

export const Wrapper = props => (
  <StyledDiv>
    <h1>Yet Another React-Redux Boilerplate</h1>
    {props.children}
  </StyledDiv>
);