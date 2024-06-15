import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  .name {
    font-weight: bold;
    font-size: 1rem;
  }

  .username {
    color: #657786;
    font-size: 14px;
  }
`;

export default Wrapper;
