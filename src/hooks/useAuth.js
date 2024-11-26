import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';


export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const {token, delToken} = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        'Authorization': `bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem('bearer');
          window.location.href = 'http://localhost:3000/auth';
        }

        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch(err => {
        console.error(err);
        delToken();
        setAuth({});
      });
  }, [token]);

  const clearAuth = () => setAuth({});

  return [auth, clearAuth];
};
