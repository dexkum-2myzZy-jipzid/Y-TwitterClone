import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0 0 0;

  .tweet-reply-input {
    width: 100%;
    margin: 0 1rem;
  }

  .tweet-reply-button {
    font-size: 14px;
    color: white;
    background-color: #1da1f2;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 0.5rem 0;
  }

  .tweet-reply-button:disabled {
    color: white;
    background-color: #9ad0f5;
    cursor: not-allowed;
  }
`;

export default Wrapper;
