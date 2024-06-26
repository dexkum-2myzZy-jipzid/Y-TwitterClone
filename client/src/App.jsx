import { useState } from 'react';
import './App.css';
import Landing from './pages/Landing';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as tweetFeedLoader } from './pages/TweetFeed';
import { loader as tweetLoader } from './pages/TweetPage';
import { action as replyAction } from './pages/TweetPage';
import { loader as userLoader } from './pages/Home';
import { loader as profileLoader } from './pages/Profile';
import { loader as postsLoader } from './pages/Posts';
import { loader as repliesLoader } from './pages/Replies';
import { loader as likesLoader } from './pages/Likes';
import Home from './pages/Home';
import TweetFeed from './pages/TweetFeed';
import TweetPage from './pages/TweetPage';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Replies from './pages/Replies';
import Likes from './pages/Likes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'home',
        element: <Home />,
        loader: userLoader,
        children: [
          {
            index: true,
            element: <TweetFeed />,
            loader: tweetFeedLoader,
          },
          {
            path: 'tweet/:id',
            element: <TweetPage />,
            loader: tweetLoader,
            action: replyAction,
          },
          {
            path: 'profile/:id',
            element: <Profile />,
            loader: profileLoader,
            children: [
              {
                index: true,
                element: <Posts />,
                loader: postsLoader,
              },
              {
                path: 'replies',
                element: <Replies />,
                loader: repliesLoader,
              },
              {
                path: 'likes',
                element: <Likes />,
                loader: likesLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
