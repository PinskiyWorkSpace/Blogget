import style from './Post.module.css';
import PropTypes from 'prop-types';
import ImagePost from './ImagePost';
import Content from './Content';
import Rating from './Rating';
import DatePost from './DatePost';
import BtnDelete from './BtnDelete';


export const Post = ({postData}) => {
  const {title, author, ups, thumbnail, created_utc: date} = postData;
  return (

    <li className={style.post}>
      <ImagePost title={title} thumbnail={thumbnail}/>
      <Content title={title} author={author} />
      <Rating ups={ups}/>
      <DatePost date={date}/>
      <BtnDelete />
    </li>
  );
};


Post.propTypes = {
  postData: PropTypes.object,
};


