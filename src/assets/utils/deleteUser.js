/* eslint-disable no-console */
import { useHistory } from 'react-router-dom';
import { removeSession } from './localStorage.utils';
import { shortFetch } from './fetch.utils';
import { USER } from '../../router/router';

export const deleteUser = (userId) => {
  const history = useHistory();

  shortFetch({
    url: `${USER}/${userId}`,
    method: 'DELETE',
    token: true,
    onSuccess: (res) => {
      console.log(res);
      removeSession();
      history.push('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
