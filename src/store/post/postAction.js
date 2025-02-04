import axios from 'axios';
import { URL_API } from '../../api/const';


export const POST_REQUEST = 'POST_REQUEST';
export const POST_REQUEST_SUCCESS = 'POST_REQUEST_SUCCESS';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const postsRequest = () => ({
  type: POST_REQUEST,
});

export const postsRequestSuccess = (data) => ({
  type: POST_REQUEST_SUCCESS,
  data,
});

export const postsRequestError = (err) => ({
  type: POST_REQUEST_ERROR,
  err,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) return;
  dispatch(postsRequest());

  axios(`${URL_API}/best?limit=10`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data }) => {
      dispatch(postsRequestSuccess(data.data.children));
    })
    .catch((err) => {
      console.error(err);
      dispatch(postsRequestError(err.toString()));
    });
};
