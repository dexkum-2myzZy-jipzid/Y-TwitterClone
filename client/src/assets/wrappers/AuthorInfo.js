import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .author-details {
    display: flex;
    flex-direction: column;
    .author-display-name {
      grid-area: displayname;
      font-weight: bold;
      font-size: 1rem;
      text-align: left;
      margin-left: 1rem;
      margin-top: 4px;
    }
    .author-username {
      grid-area: username;
      color: #657786;
      font-size: 14px;
      text-align: left;
      margin-left: 1rem;
    }
  }
`;

export default Wrapper;
