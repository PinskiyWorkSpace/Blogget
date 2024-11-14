import style from './List.module.css';
import Post from './Post';


export const List = () => {
  const postsData = [
    {
      thumbnail: '',
      title: 'Title1',
      author: 'Nickname1',
      ups: 77,
      date: '2022-01-21T09:45:00.000Z',
      id: '123',
    },
    {
      thumbnail: '',
      title: 'Title2',
      author: 'Nickname2',
      ups: 58,
      date: '2022-02-24T09:45:00.000Z',
      id: '456',
    },
    {
      thumbnail: '',
      title: 'Title3',
      author: 'Nickname3',
      ups: 24,
      date: '2022-02-24T09:45:00.000Z',
      id: '789',
    },
    {
      thumbnail: '',
      title: 'Title4',
      author: 'Nickname4',
      ups: 124,
      date: '2022-02-24T00:45:00.000Z',
      id: '321',
    }
  ];

  return (
    <ul className={style.list}>
      {postsData.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </ul>
  );
};

