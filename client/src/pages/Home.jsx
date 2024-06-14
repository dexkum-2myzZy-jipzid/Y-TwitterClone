import { SideMenu } from '../components';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Wrapper = styled.section`
  display: flex;
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
