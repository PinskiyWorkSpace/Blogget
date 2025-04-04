import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import { useEffect, useRef } from 'react';
import { useCommentsData } from '../../hooks/useCommentsData';
import Comments from './Comments';
import FormComment from './FormComment';
import CommentsLoader from '../../UI/CommentsLoader';
import { useNavigate, useParams } from 'react-router-dom';

export const Modal = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const { post, comments, status } = useCommentsData(id);

  const handleClick = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      // closeModal();
      navigate(`/category/${page}`);
    }
  };

  const handleCloseClick = () => {
    navigate(`/category/${page}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      navigate(`/category/${page}`);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!post) {
    return (
      <div className={style.overlay} ref={overlayRef}>
        <div className={style.modal}>Загрузка поста...</div>
      </div>);
  }

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && <CommentsLoader/>}
        {status === 'error' && 'Ошибка!'}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>{post.title}</h2>

            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>
                {post.selftext}
              </Markdown>
            </div>

            <p className={style.author}>{post.author}</p>

            <FormComment />

            <Comments comments={comments} />

            <button
              className={style.close}
              onClick={handleCloseClick}
            >
              <CloseIcon />
            </button>
          </>
        )}

      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
