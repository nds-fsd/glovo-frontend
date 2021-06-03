/* eslint-disable no-console */
import { useHistory } from 'react-router-dom';
import { deleteStorageObject } from './localStorage.utils';
import { shortFetch } from './fetch.utils';
import { BACKEND, USER } from '../../router/router';

export const deleteUser = (userId) => {
  const history = useHistory();
  shortFetch({
    url: `${BACKEND}${USER}${userId}`,
    method: 'DELETE',
    token: true,
    onSuccess: () => {
      deleteStorageObject();
      history.push('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
