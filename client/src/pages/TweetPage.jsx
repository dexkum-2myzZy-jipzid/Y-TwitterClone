import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';
import RetweetCard from '../components/RetweetCard';
import DateManager from '../utils/dateManager';
import Interactions from '../components/Interactions';
import { useState } from 'react';
import Comment from '../components/Comment';
import ReplySection from '../components/ReplySection';
import AuthorInfo from '../components/AuthorInfo';
import TweetNavigation from '../components/TweetNavigation';
import TweetBody from '../components/TweetBody';
import Wrapper from '../assets/wrappers/TweetPage';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/tweets/${params.id}`);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post(`/tweets/${params.id}/comments`, {
      text: data.text,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    toast.error(error.error);
  }
};

const TweetPage = () => {
  const [text, setText] = useState('');
  const initialTweetData = useLoaderData();
  const actionTweetData = useActionData();
  const tweet = actionTweetData || initialTweetData;
  const {
    createdBy: user,
    retweet,
    retweet: { createdBy: retweetUser } = {},
  } = tweet;

  const navigate = useNavigate();

  const handleRetweetClick = (event) => {
    event.stopPropagation();
    navigate(`/home/tweet/${retweet._id}`);
  };

  return (
    <Wrapper>
      <Form method="post">
        <TweetNavigation navigate={navigate} title={'Post'} />
        <AuthorInfo user={user} />
        <TweetBody tweet={tweet} />
        {retweet && (
          <RetweetCard
            retweetUser={retweetUser}
            retweet={retweet}
            handleRetweetClick={handleRetweetClick}
          />
        )}
        <div className="tweet-timestamp">
          {DateManager.formatDate(tweet.createdAt)}
        </div>
        <Divider />
        <Interactions
          isBottom={false}
          replies={tweet.replies}
          retweets={tweet.retweets}
          likes={tweet.likes}
          views={tweet.views}
        />
        <Divider />
        <ReplySection user={user} text={text} setText={setText} />
        {tweet.comments &&
          tweet.comments.map((comment) => (
            <Comment key={comment._id} tweet={comment} />
          ))}
      </Form>
    </Wrapper>
  );
};
export default TweetPage;
