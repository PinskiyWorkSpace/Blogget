import PropTypes from 'prop-types';
import style from './Content.module.css';
import { Text } from '../../../../../UI/Text/Text';
import { Link, useParams } from 'react-router-dom';

export const Content = ({ title, author, id }) => {
  const { page } = useParams();

  return (
    <div className={style.content}>
      <Text As='h2' className={style.title}>
        <Link className={style.linkPost} to={`/category/${page}/post/${id}`}>
          <Text size={18} tsize={24} className={style.linkPost}>
            {title}
          </Text>
        </Link>
      </Text>
      <Text
        As='a'
        size={12}
        tsize={14}
        color='orange'
        className={style.linkAuthor}
        href='#author'
      >
        {author}
      </Text>
    </div>
  );
};

Content.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
};


