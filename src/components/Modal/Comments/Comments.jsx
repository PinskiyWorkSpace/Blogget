import style from './Comments.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../UI/Text';
import DatePost from '../../Main/List/Post/DatePost';

export const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>Нет комментариев</p>;
  }

  return (
    <ul className={style.list}>
      {comments.map(({ id, author, body, created_utc: date }) => {
        if (date === undefined) {
          return (
            <li className={style.item} key={id}>
              <Text as='p' className={style.comment} size={14} tsize={18}>
                Нет даты
              </Text>
            </li>
          );
        }
        return (
          <li className={style.item} key={id}>
            <Text as='h3' className={style.author} size={18} tsize={22}>
              {author}
            </Text>
            <Text as='p' className={style.comment} size={14} tsize={18}>
              {body}
            </Text>
            <DatePost date={date} />
          </li>
        );
      })}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

