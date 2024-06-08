import { SideMenu } from '../components';
import styled from 'styled-components';
import TweetFeed from './TweetFeed';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';

const Wrapper = styled.section`
  display: flex;
`;

export const loader = async () => {
  try {
    const response = await customFetch.get('/tweets');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const Home = () => {
  const { tweets } = useLoaderData();

  return (
    <Wrapper>
      <SideMenu />
      <TweetFeed tweets={tweets} />
    </Wrapper>
  );
};
export default Home;
