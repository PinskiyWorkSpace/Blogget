import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS
} from './commentsAction';

const initialState = {
  status: '',
  post: null,
  comments: [],
  error: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        status: 'loading',
        post: {},
        comments: [],
        error: '',
      };
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        post: action.post,
        comments: action.comments,
        error: '',
      };
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.err,
      };
    default:
      return state;
  }
};
