import Wrapper from '../assets/wrappers/UserInfo';

const UserInfo = ({ name, username, date }) => (
  <Wrapper>
    <div className="name">{name}</div>
    <div className="username">
      @{username} · {date}
    </div>
  </Wrapper>
);
export default UserInfo;
