import style from './List.module.css';
import Post from './Post';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../../../store/post/postAction';
import { Outlet, useParams } from 'react-router-dom';

export const List = () => {
  const postsData = useSelector(state => state.posts.posts);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '100px'
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);
  return (
    <ul className={style.list}>
      {postsData.map(({ data: postData }) => (
        <Post key={postData.id} postData={postData} />
      ))}
      <li ref={endList} className={style.end} />
      <Outlet />
    </ul>
  );
};

