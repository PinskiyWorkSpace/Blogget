import style from './Auth.module.css';
import PropTypes from 'prop-types';
import { urlAuth } from '../../../api/auth';
import { Text } from '../../../UI/Text';
import { useState } from 'react';
import { ReactComponent as LoginIcon } from './img/login.svg';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../../../store/tokenReducer';
import { useAuth } from '../../../hooks/useAuth';
import { AuthLoader } from '../../../UI/AuthLoader/AuthLoader';

export const Auth = () => {
  const [logout, setLogout] = useState(false);
  const [auth, loading, clearAuth] = useAuth();
  const dispatch = useDispatch();

  const logoutBtn = () => {
    setLogout(!logout);
  };

  const loginOut = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  return (
    <div className={style.container}>
      {loading ? (
        <AuthLoader />
        ) : auth.name ? (
        <>
          <button className={style.btn} onClick={logoutBtn}>
            <img
              className={style.img}
              src={auth.img}
              title={auth.name}
              alt={`Аватар ${auth.name}`}>
            </img>
          </button>
          {logout && (
            <button
              className={style.logout}
              onClick={loginOut}>
              Выйти
            </button>)}
        </>

      ) : (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  delToken: PropTypes.func,
};

