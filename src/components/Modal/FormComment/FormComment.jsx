import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useAuth} from '../../../hooks/useAuth';
import {useRef, useState, useEffect} from 'react';

export const FormComment = () => {
  const [auth] = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const textAreaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textAreaRef.current.value);
    setIsFormVisible(false);
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
          <Text as='h3' size={14} tsize={18}>{auth.name}</Text>
          <textarea className={style.textarea} ref={textAreaRef}></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
