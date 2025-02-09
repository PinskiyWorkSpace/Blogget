import {
  POST_REQUEST,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_ERROR,
} from './postAction';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        error: '',
      };
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: '',
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
