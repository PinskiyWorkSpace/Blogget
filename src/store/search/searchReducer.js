import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_ERROR,
  SEARCH_REQUEST_SUCCESS
} from './searchAction';

const initialState = {
  loading: false,
  posts: [],
  error: null,
  after: '',
  isLast: false,
  page: '',
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: true,
        post: action.post,
        error: '',
        after: action.after,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
