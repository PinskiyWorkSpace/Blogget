import classNames from 'classnames';
import style from './Text.module.css';
import PropTypes from 'prop-types';

export const Text = prop => {
  const {
    As = 'span',
    color = 'black',
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
    medium,
    bold,
    onClick,
  } = prop;

  const classes = classNames(
    className,
    style[color],
    { [style.medium]: medium },
    { [style.bold]: bold },
    { [style.center]: center },
    { [style[`fs${size}`]]: size },
    { [style[`fst${tsize}`]]: tsize },
    { [style[`fsd${dsize}`]]: dsize },
  );


  return <As className={classes} href={href} onClick={onClick}>{children}</As>;
};

Text.propTypes = {
  As: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  href: PropTypes.string,
  center: PropTypes.bool,
  medium: PropTypes.string,
  bold: PropTypes.string,
};

