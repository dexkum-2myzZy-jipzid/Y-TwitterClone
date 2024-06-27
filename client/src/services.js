import { toast } from 'react-toastify';
import customFetch from './utils/customFetch';

export const fetchTweets = async (cursor = '', direction = '', limit) => {
  try {
    const response = await customFetch.get(
      `/tweets${cursor ? `?cursor=${cursor}` : ''}${
        direction ? `&direction=${direction}` : ''
      }${limit ? `&limit=${limit}` : ''}`
    );
    return response.data.tweets;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    throw error;
  }
};

// profile - follow
export const follow = async (id) => {
  try {
    const response = await customFetch.post(`/users/${id}/follow`);
    return response.data;
  } catch (error) {
    toast.error(error.error);
  }
};

// profile - unfollow
export const unfollow = async (id) => {
  try {
    const response = await customFetch.delete(`/users/${id}/follow`);
    return response.data;
  } catch (error) {
    toast.error(error.error);
  }
};
