import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS
} from './commentsAction';

const initialState = {
  data: {},
  comments: {},
  error: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        data: {},
        comments: {},
        error: '',
      };
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        comments: action.comments,
        error: '',
      };
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        data: {},
        comments: {},
        error: action.err,
      };
    default:
      return state;
  }
};
