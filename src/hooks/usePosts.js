import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../store/post/postAction';

export const usePosts = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const postsData = useSelector((state) => state.posts.posts);


  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token]);

  return [postsData];
};
