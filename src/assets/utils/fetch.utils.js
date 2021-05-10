import { BACKEND } from '../../router/router';
import { getUserToken } from './localStorage.utils';

export const shortFetch = ({
  url,
  body,
  method,
  params,
  token,
  onSuccess = () => {},
  onError = () => {},
}) => {
  let parsedUrl = `${BACKEND}${url}`;
  if (params) {
    parsedUrl = `${parsedUrl}&${params}`;
  }
  fetch(parsedUrl, {
    method: `${method}`,
    headers: new Headers({
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token && getUserToken()}`,
    }),
    mode: 'cors',
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      onError(error);
    });
};
