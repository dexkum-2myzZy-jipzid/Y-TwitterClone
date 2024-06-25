import styled from 'styled-components';

const StyledEndMessage = styled.p`
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: var(--primary-500);
  fontstyle: italic;
`;

const EndMessage = () => {
  return <StyledEndMessage>This is my bottom line.</StyledEndMessage>;
};

export default EndMessage;
