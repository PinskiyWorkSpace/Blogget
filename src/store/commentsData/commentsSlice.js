import { createSlice } from '@reduxjs/toolkit';
import { commentsRequestAsync } from './commentsAction';

const initialState = {
  status: '',
  post: {},
  comments: [],
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // commentsRequest: (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // },
    // commentsRequestSuccess: (state, action) => {
    //   state.post = action.payload.post;
    //   state.comments = action.payload.comments;
    //   state.status = 'loaded';
    //   state.error = '';
    // },
    // commentsRequestError: (state, action) => {
    //   state.error = action.error;
    //   state.status = 'error';
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(commentsRequestAsync.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(commentsRequestAsync.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.comments = action.payload.comments;
        state.error = '';
        state.status = 'loaded';
      })
      .addCase(commentsRequestAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = 'error';
      });
  },
});

export default commentsSlice.reducer;
