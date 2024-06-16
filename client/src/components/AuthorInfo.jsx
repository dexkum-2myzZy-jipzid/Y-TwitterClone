import { Avatar } from '@mui/material';
import Wrapper from '../assets/wrappers/AuthorInfo';

const AuthorInfo = ({ user }) => {
  return (
    <Wrapper>
      <Avatar
        className="avatar"
        src={user.avatar}
        alt="avatar"
        sx={{ width: 48, height: 48 }}
      />
      <div className="author-details">
        <div className="author-display-name">{user.displayname}</div>
        <div className="author-username">{user.username}</div>
      </div>
    </Wrapper>
  );
};

export default AuthorInfo;
