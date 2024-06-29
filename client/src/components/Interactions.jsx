import {
  FavoriteBorderOutlined as Favorite,
  ChatBubbleOutlineOutlined as Comment,
  RepeatOutlined as Retweet,
} from '@mui/icons-material';
import Wrapper from '../assets/wrappers/Interactions';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Interactions = ({
  tweetId,
  isBottom = true,
  replies,
  retweets,
  likes,
}) => {
  const interactionItems = [
    {
      icon: Comment,
      count: replies,
      color: '#add8e6',
    },
    {
      icon: Retweet,
      count: retweets,
      color: '#90ee90',
    },
    {
      icon: Favorite,
      count: likes,
      color: '#ff6c6c',
    },
  ];

  const navigate = useNavigate();

  function handleInteractionClick(event, index) {
    event.stopPropagation();

    if (index === 0) {
      // TODO: Implement a popover for adding comments.
      // Currently, redirecting to a separate page as a temporary solution.
      navigate(`/home/tweet/${tweetId}`);
    } else if (index === 1) {
      requestRetweet(tweetId).catch((error) =>
        console.error('Error retweet tweet:', error)
      );
    } else if (index === 2) {
      requestLike(tweetId).catch((error) =>
        console.error('Error liking tweet:', error)
      );
    }
  }

  const requestLike = async (id) => {
    try {
      const response = await customFetch.post(`/tweets/${id}/likes`);
      const { data } = response.data;
      return data;
    } catch (error) {
      console.error('Error in requestLike:', error); // More generic error handling
      toast.error('You are not authorized to view this page'); // Specific error message for unauthorized access
    }
  };

  const requestRetweet = async (id) => {
    try {
      const response = await customFetch.post(`/tweets/${id}/retweets`);
      const { data } = response.data;
      return data;
    } catch (error) {
      console.error('Error in requestRetweet:', error);
      toast.error('You are not authorized to view this page');
    }
  };

  return (
    <Wrapper isBottom={isBottom}>
      {interactionItems.map((item, index) => (
        <Wrapper
          key={index}
          hoverColor={item.color}
          onClick={(event) => handleInteractionClick(event, index)}>
          <div className="interaction-item">
            <item.icon className="icon" fontSize="small" />
            <span>{item.count}</span>
          </div>
        </Wrapper>
      ))}
    </Wrapper>
  );
};

export default Interactions;
