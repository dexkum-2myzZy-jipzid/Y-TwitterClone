import { SideMenu } from '../components';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;

  .right-container {
    margin-left: 250px;
    overflow-y: auto;
    height: 100vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <SideMenu />
      <div className="right-container">
        <Outlet />
      </div>
    </Wrapper>
  );
};
export default Home;
