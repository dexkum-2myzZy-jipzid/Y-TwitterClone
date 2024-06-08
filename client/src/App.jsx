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
import { loader as tweetFeedLoader } from './pages/Home';
import Home from './pages/Home';

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
        loader: tweetFeedLoader,
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
