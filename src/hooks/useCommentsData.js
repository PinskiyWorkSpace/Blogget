import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsRequestAsync } from '../store/commentsData/commentsAction';

export const useCommentsData = (id) => {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.data);
  const commentsData = useSelector(state => state.commentsData.comments);


  useEffect(() => {
    dispatch(commentsRequestAsync(id));
  }, [token]);

  return [post, commentsData];
};


