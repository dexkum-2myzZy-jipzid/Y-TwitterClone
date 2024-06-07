import { SideMenu } from '../components';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 200px 1fr;
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
      <div className="content">content</div>
    </Wrapper>
  );
};
export default Home;
