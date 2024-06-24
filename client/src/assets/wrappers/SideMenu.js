import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16rem;
  padding: 1.5rem;
  box-sizing: border-box;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .side-menu-content {
    height: 60%;

    .side-menu-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: larger;

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

    .icon {
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .tweet-btn {
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 1.5rem;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    margin: 1.5rem 0;
    cursor: pointer;
    width: 80%;

    &:hover {
      background-color: #0d8ddb;
    }
  }

  .tweet-icon-btn {
    display: none;
  }

  .author-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .author-details {
      display: flex;
      flex-direction: column;

      .author-display-name {
        grid-area: displayname;
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
        margin: 4px 0 4px 1rem;
      }
      .author-username {
        grid-area: username;
        color: #657786;
        font-size: 14px;
        text-align: left;
        margin-left: 1rem;
      }
    }
  }

  @media (max-width: 48rem) {
    width: 8rem;

    .side-menu-item {
      .name {
        display: none;
      }

      .icon {
        margin-right: 0;
      }
    }

    .tweet-btn {
      display: none;
    }

    .tweet-icon-btn {
      display: block;
      background-color: #1da1f2;
      color: white;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;

      &:hover {
        background-color: #0d8ddb;
      }
    }
    .author-info {
      .author-details {
        display: none;
      }
    }
  }
`;

export default Wrapper;
