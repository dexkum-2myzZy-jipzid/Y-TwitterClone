import { PostTweet, SideMenu } from '../components';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  .right-container {
    width: 500px;
    overflow-y: auto;
    /* height: 100vh; */
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get('/users');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/');
  }
};

const HomeContext = createContext();

const Home = () => {
  const user = useLoaderData();
  const [showPopover, setShowPopover] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    // localStorage.setItem('darkTheme', newDarkTheme);
  };

  function togglePopover() {
    setShowPopover(!showPopover);
  }

  return (
    <HomeContext.Provider
      value={{
        user,
        isDarkTheme,
        toggleDarkTheme,
      }}>
      <Wrapper>
        <SideMenu togglePopover={togglePopover} />
        <div className="right-container">
          <Outlet />
        </div>
      </Wrapper>
      {showPopover && <PostTweet togglePopover={togglePopover} />}
    </HomeContext.Provider>
  );
};
export const useHomeContext = () => useContext(HomeContext);
export default Home;
