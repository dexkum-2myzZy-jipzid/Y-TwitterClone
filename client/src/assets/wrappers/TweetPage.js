import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 1rem;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .tweet-body {
    p {
      margin: 0.5rem 0;
      font-size: 16px;
      text-align: start;
      line-height: 1.5;
    }
  }

  .tweet-media {
    border: 1px solid #e1e8ed;
    border-radius: 5px;
    max-width: 100%;
  }

  .tweet-timestamp {
    margin: 1rem 0;
    text-align: left;
    font-size: 16px;
    color: var(--grey-500);
  }
`;

export default Wrapper;
