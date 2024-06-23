import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.8);
  height: 55px;
  width: 500px;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  align-items: center;

  .navigation-bar-title {
    margin-left: 2rem;
    font-size: x-large;
  }
`;

const NavigationBar = ({ title, handleBackClick }) => {
  return (
    <Wrapper className="navigation-bar">
      <ArrowBackIcon onClick={handleBackClick} />
      <strong className="navigation-bar-title">{title}</strong>
    </Wrapper>
  );
};

export default NavigationBar;
