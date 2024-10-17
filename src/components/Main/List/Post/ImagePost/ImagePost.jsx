import style from './ImagePost.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';

export const ImagePost = ({title}) => (
  <img className={style.img} src={notphoto} alt={title} />
);

ImagePost.propTypes = {
  title: PropTypes.string,
};

