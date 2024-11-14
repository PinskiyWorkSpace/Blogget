import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState} from 'react';

import {ReactComponent as LoginIcon} from './img/login.svg';
import {useAuth} from '../../../hooks/useAuth';

export const Auth = ({token, delToken}) => {
  const [auth, setAuth] = useAuth(token);
  const [logout, setLogout] = useState(false);

  const logoutBtn = () => {
    setLogout(!logout);
  };

  const loginOut = () => {
    delToken();
    setAuth({});
    window.location.href = 'http://localhost:3000/auth';
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn} onClick={logoutBtn}>
            <img className={style.img} src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`}></img>
          </button>
          {logout && (<button className={style.logout}
            onClick={loginOut}>Выйти</button>)}
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
  token: PropTypes.string,
  delToken: PropTypes.func,
};

