import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import { useEffect, useRef } from 'react';
import { useCommentsData } from '../../hooks/useCommentsData';
import Comments from './Comments';
import FormComment from './FormComment';

export const Modal = ({ id, closeModal }) => {
  const overlayRef = useRef(null);
  const [commentsData] = useCommentsData(id);
  const [post, comments] = commentsData;

  const handleClick = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleCloseClick = () => {
    closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeModal();
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
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
