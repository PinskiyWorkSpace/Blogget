import style from './ImagePost.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';

export const ImagePost = ({ thumbnail, title }) => (
  <img
    className={style.img}
    src={thumbnail.includes('.jpg') ? thumbnail : notphoto}
    alt={title}
  />
);

ImagePost.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};

