import { Text } from '../../../UI/Text';
import style from './List.module.css';
import Post from './Post';
import { usePosts } from '../../../hooks/usePosts';

export const List = () => {
  const [posts] = usePosts();

  return (
    <ul className={style.list}>
      {posts && posts.length > 0 ? (
        posts.map(({ data: postData }) => (
          <Post key={postData.id} postData={postData} />
        ))
      ) : (
        <Text As='p'>Авторизуйтесь</Text>
      )}
    </ul>
  );
};

