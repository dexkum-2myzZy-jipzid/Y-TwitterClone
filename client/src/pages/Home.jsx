import { SideMenu } from '../components';
import styled from 'styled-components';
import TweetFeed from './TweetFeed';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100vh;
  .side-menu {
    background-color: #f5f5f5;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
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
