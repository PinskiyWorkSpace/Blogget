import axios from 'axios';
import { URL_API } from '../../api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, { getState }) => {
    const token = getState().token.token;
    const after = getState().posts.after;
    const page = newPage || getState().posts.page;

    return axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(({ data }) => ({
        ...data.data,
        page
      }))
      .catch((error) => (error.toString()));
  });
