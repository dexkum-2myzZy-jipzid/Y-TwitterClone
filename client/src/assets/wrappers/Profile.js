import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .profile-app-bar {
    position: fixed;
    background: rgba(255, 255, 255, 0.5);
    height: 55px;

    display: flex;
    flex-direction: row;
    align-items: center;

    .profile-app-bar-name {
      margin-left: 2rem;
      font-size: x-large;
    }
  }

  .profile-header {
    margin-top: 55px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .banner {
      height: 200px;
      background-color: #dcdcdc;
      object-fit: cover;
    }
    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 4px solid white;
      margin-top: -40px;
      margin-left: 1rem;
    }
    .profile-displayname {
      text-align: left;
      margin-left: 1rem;
      font-size: x-large;
      padding-top: 1rem;
    }
    .profile-username {
      color: var(--grey-500);
      text-align: left;
      margin-left: 1rem;
      padding-top: 0.5rem;
    }

    .profile-joined-date {
      display: flex;
      flex-direction: row;
      color: var(--grey-500);
      align-items: center;
      padding-top: 0.5rem;
      margin-left: 1rem;

      .calendar-month-icon {
        font-size: 22px;
      }
      .join-date {
        margin-left: 4px;
      }
    }
  }
`;

export default Wrapper;
