import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Wrapper from '../assets/wrappers/TweetNavigation';

const TweetNavigation = ({ navigate, title }) => {
  return (
    <Wrapper>
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <span>{title}</span>
    </Wrapper>
  );
};

export default TweetNavigation;
