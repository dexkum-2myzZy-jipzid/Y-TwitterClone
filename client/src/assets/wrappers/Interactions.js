import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #657786;
  width: 100%;

  .interaction-item {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      font-size: small;
    }
    &:hover {
      cursor: pointer;
      color: ${(props) => props.hoverColor};
    }
  }
`;

export default Wrapper;
