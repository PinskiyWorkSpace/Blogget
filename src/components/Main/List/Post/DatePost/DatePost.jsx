import style from './DatePost.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';

export const DatePost = ({date}) => (
  <time className={style.date} dateTime={date}>
    {formatDate(date)}
  </time>
);

DatePost.propTypes = {
  date: PropTypes.number,
};
