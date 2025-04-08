import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/const';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (page, { getState }) => {
    console.log('page: ', page);
    const state = getState();
    const token = state.token.token;
    const after = state.posts.after;

    return axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.data.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  }
);

export const changePage = createAsyncThunk(
  'posts/changePage',
  (page) => page,
);
