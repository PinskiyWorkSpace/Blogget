import axios from 'axios';
import { URL_API } from '../../api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const commentsRequestAsync = createAsyncThunk(
  'comments/fetch',
  (id, { getState }) => {
    const token = getState().token.token;
    if (!token) return;
    return axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.data;
      })
      .then((data) => {
        const post = data[0].data.children[0]?.data;
        const comments = data[1].data.children.map(item => item.data) || [];
        return { post, comments };
      })
      .catch((error) => (error.toString()));
  });
