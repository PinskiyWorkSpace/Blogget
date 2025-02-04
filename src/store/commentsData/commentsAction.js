import axios from 'axios';
import { URL_API } from '../../api/const';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';

export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

export const commentsRequestSuccess = (data, comments) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data,
  comments,
});

export const commentsRequestError = (err) => ({
  type: COMMENTS_REQUEST_ERROR,
  err,
});

export const commentsRequestAsync = (id) => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) return;

  axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(
      ([
        {
          data: {
            children: [{ data: post }],
          },
        },
        {
          data: {
            children,
          },
        },
      ]) => {
        const comments = children.map(item => item.data);

        dispatch(commentsRequestSuccess(post, comments));
      },
    )
    .catch((err) => {
      console.error(err);
      dispatch(commentsRequestError(err.toString()));
    });
};

