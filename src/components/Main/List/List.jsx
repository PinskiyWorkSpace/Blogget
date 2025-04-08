import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import style from './List.module.css';
import Post from './Post';
import { fetchPosts, changePage } from '../../../store/post/postAction';

export const List = () => {
  const postsData = useSelector(state => state.posts.posts);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    if (page) {
      console.log('Dispatching fetchPosts with:', page);
      dispatch(changePage(page));
      dispatch(fetchPosts(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchPosts());
      }
    }, {
      rootMargin: '100px'
    });

    if (endList.current) {
      observer.observe(endList.current);
    }

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, dispatch, page]);

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
