import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../store/post/postAction';

export const usePosts = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const posts = useSelector((state) => state.posts.data);


  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token]);

  return [posts];
};
