import { Text } from '../../../UI/Text';
import style from './List.module.css';
import Post from './Post';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../../../store/post/postAction';

export const List = () => {
  const postsData = useSelector(state => state.posts.posts);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargit: '100px'
    });

    observer.observe(endList.current);
  }, [endList.current]);
  return (
    <ul className={style.list}>
      {postsData && postsData.length > 0 ? (
        postsData.map(({ data: postData }) => (
          <Post key={postData.id} postData={postData} />
        ))
      ) : (
        <Text As='p'>Авторизуйтесь</Text>
      )}
      <li ref={endList} className={style.end}/>
    </ul>
  );
};

