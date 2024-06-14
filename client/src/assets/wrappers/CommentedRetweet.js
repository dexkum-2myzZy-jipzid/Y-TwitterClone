import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 1rem;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  cursor: pointer;

  &:hover {
    background-color: var(--grey-100);
  }

  .tweet-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tweet-content {
    p {
      margin: 0.5rem 0;
      font-size: 16px;
      text-align: start;
      line-height: 1.5;
    }
  }

  .tweet-image {
    border: 1px solid #e1e8ed;
    border-radius: 5px;
    max-width: 100%;
  }

  .retweet {
    border: 1px solid #e1e8ed;
    border-radius: 1rem;
    max-width: 100%;
    margin-top: 8px;
    padding: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .retweet-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
    }

    .retweet-content {
      margin-top: 8px;

      text-align: left;
      line-height: 1.5;
      max-height: 74px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .retweet:hover {
    background-color: var(--grey-200);
  }
`;

export default Wrapper;
