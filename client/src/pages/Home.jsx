import { SideMenu } from '../components';
import styled from 'styled-components';
import TweetFeed from './TweetFeed';

const Wrapper = styled.section`
  display: flex;
`;

const Home = () => {
  return (
    <Wrapper>
      <SideMenu />
      <TweetFeed />
    </Wrapper>
  );
};
export default Home;
