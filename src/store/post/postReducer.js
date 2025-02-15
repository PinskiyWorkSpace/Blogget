import {
  POST_REQUEST,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_ERROR,
  POST_REQUEST_SUCCESS_AFTER,
} from './postAction';

const initialState = {
  loading: false,
  posts: {},
  error: '',
  after: '',
  isLast: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: '',
        after: action.after,
        isLast: !action.after,

      };

    case POST_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.posts],
        error: '',
        after: action.after,
        isLast: !action.after,

      };
    case POST_REQUEST_ERROR:
      return {
        ...state,
        error: action.err,
      };
    default:
      return state;
  }
};
