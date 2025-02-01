import style from './FormComment.module.css';
import { Text } from '../../../UI/Text';
import { useAuth } from '../../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../../store/commentReducer';

export const FormComment = () => {
  const value = useSelector(state => state.comment.comment);
  const dispatch = useDispatch();

  const [auth] = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const textAreaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    dispatch(updateComment(e.target.value));
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isFormVisible]);

  return (
    <>
      {!isFormVisible ? (
        <button
          className={style.btn}
          onClick={() => {
            setIsFormVisible(true);
          }}
        >
          Отправить коментарий
        </button>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <Text
            as='h3'
            size={14}
            tsize={18}
          >
            {auth.name}
          </Text>
          <textarea
            className={style.textarea}
            ref={textAreaRef}
            defaultValue={value}
            onChange={handleChange}
          >
          </textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
