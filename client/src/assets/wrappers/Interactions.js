import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isBottom ? 'space-between' : 'center')};
  margin: ${(props) => (props.isBottom ? '10px 0 0 0' : '0.5rem 0')};
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
