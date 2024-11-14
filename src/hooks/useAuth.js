import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';


export const useAuth = (token) => {
  const [auth, setAuth] = useState({});
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
        setAuth({});
      });
  }, [token]);

  return [auth, setAuth];
};
