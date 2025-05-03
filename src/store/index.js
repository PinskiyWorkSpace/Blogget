import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { commentReducer } from './commentReducer';
import { authReducer } from './auth/authReducer';
import postsReducer from './post/postSlice';
import { searchReducer } from './search/searchReducer';
import commentsReducer from './commentsData/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
