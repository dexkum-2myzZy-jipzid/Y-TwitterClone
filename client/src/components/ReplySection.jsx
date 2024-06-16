import { Avatar, TextField } from '@mui/material';
import Wrapper from '../assets/wrappers/ReplySection';

const ReplySection = ({ user, text, setText }) => {
  return (
    <Wrapper>
      <Avatar
        className="avatar"
        src={user.avatar}
        alt="avatar"
        sx={{ width: 48, height: 48 }}
      />
      <TextField
        className="tweet-reply-input"
        id="standard-textarea"
        placeholder="Post you reply"
        multiline
        variant="standard"
        rows={2}
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="tweet-reply-button" type="submit" disabled={!text}>
        Reply
      </button>
    </Wrapper>
  );
};

export default ReplySection;
