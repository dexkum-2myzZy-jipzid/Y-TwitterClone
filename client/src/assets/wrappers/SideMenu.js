import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 16rem;
  padding: 1.5rem;
  box-sizing: border-box;

  .side-menu-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      background-color: #e8f5fe;
      border-radius: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }

  .active {
    color: #000;
    font-weight: bold;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tweet-btn {
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    cursor: pointer;
    width: 100%;

    &:hover {
      background-color: #0d8ddb;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding: 0.5rem 0;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .username {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-weight: bold;
  }

  .handle {
    color: gray;
  }
`;

export default Wrapper;
