import { useEffect, useState } from 'react';
import { URL_API } from '../api/const';
import { getToken } from '../api/token';


export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const token = getToken();

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
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({ name, img });
      })
      .catch(err => {
        console.error(err);
        setAuth({});
      });
  }, [token]);

  const clearAuth = () => setAuth({});

  return [auth, clearAuth];
};
