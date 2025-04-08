import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, changePage } from './postAction'; // Import changePage

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
    error: null,
    after: '',
    isLast: false,
    page: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.after) {
          state.posts = [...state.posts, ...action.payload.children];
        } else {
          state.posts = action.payload.children;
        }
        state.after = action.payload.after;
        state.isLast = !action.payload.after;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePage.fulfilled, (state, action) => {
        state.page = action.payload;
        state.after = '';
        state.isLast = false;
      });
  },
});

export const postsReducer = postsSlice.reducer;
