import { createSlice } from '@reduxjs/toolkit';
import { postsRequestAsync } from './postAction';

const initialState = {
  loading: false,
  posts: [],
  error: null,
  after: '',
  isLast: false,
  page: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postsRequestAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postsRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.page !== action.payload.page) {
          state.posts = action.payload.children;
          state.after = '';
          state.isLast = false;
        } else {
          if (state.after) {
            state.posts = [...state.posts, ...action.payload.children];
          } else {
            state.posts = action.payload.children;
          }
        }

        state.after = action.payload.after;
        state.isLast = !action.payload.isLast;
        state.page = action.payload.page;
      })
      .addCase(postsRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
