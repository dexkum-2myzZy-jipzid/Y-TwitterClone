import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;

  .retweet-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5rem 0 0px 1rem;
    color: #a0aec0;
    .icon {
      margin-right: 4px;
    }
    span {
      font-size: small;
    }
  }

  .retweet-content {
    padding: 1rem;
    display: grid;
    grid-template-columns: 3.5rem 1fr;

    .retweet-user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .retweet-text-content {
      p {
        margin: 0.5rem 0;
        font-size: 16px;
        text-align: start;
        line-height: 1.5;
      }
    }

    .retweet-image {
      border: 1px solid #e1e8ed;
      border-radius: 5px;
      max-width: 100%;
    }
  }
`;

export default Wrapper;
