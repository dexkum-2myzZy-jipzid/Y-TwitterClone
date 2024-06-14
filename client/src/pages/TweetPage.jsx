import { useLoaderData, useParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/tweets/${params.id}`);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const TweetPage = () => {
  // const params = useParams();
  const tweet = useLoaderData();
  console.log(tweet);

  return <div>{tweet.content}</div>;
};
export default TweetPage;
