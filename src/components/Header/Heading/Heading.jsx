import style from './Heading.module.css';
import PropTypes from 'prop-types';


export const Heading = (props) => <h2 className={style.heading}>{props.text}</h2>;


Heading.propTypes = {
  text: PropTypes.string,
};
