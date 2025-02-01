import { useState, useEffect } from 'react';
import { URL_API } from '../api/const';
import { useSelector } from 'react-redux';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const token = useSelector(state => state.token.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data) => {
        setPosts(data.data.children);
      })
      .catch(err => {
        console.error(err);
      });
  }, [token]);

  return [posts];
};
