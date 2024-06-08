import {
  FavoriteBorderOutlined as Favorite,
  ChatBubbleOutlineOutlined as Comment,
  RepeatOutlined as Repost,
  LeaderboardOutlined as BarChart,
} from '@mui/icons-material';
import Wrapper from '../assets/wrappers/Interactions';

const InteractionItem = ({ IconComponent, count, color }) => (
  <Wrapper hoverColor={color}>
    <div className="interaction-item">
      <IconComponent className="icon" fontSize="small" />
      <span>{count}</span>
    </div>
  </Wrapper>
);

const Interactions = ({ replies, retweets, likes, views }) => {
  const interactionItems = [
    {
      IconComponent: Comment,
      count: replies,
      color: '#add8e6',
    },
    {
      IconComponent: Repost,
      count: retweets,
      color: '#90ee90',
    },
    {
      IconComponent: Favorite,
      count: likes,
      color: '#ff6c6c',
    },
    {
      IconComponent: BarChart,
      count: views,
      color: '#b0a8ff',
    },
  ];

  return (
    <Wrapper>
      {interactionItems.map((item, index) => (
        <InteractionItem key={index} {...item} />
      ))}
    </Wrapper>
  );
};

export default Interactions;
