/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styles } from './logIn.module.css';
import { BACKEND, RESTAURANT_LIST_PAGE } from '../../router/router';
import { setSessionUser } from '../../assets/utils/localStorage.utils';
import { roleContext } from '../context/roleContext';

const LogIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { saveRole } = useContext(roleContext);
  const history = useHistory();
  const [error, setError] = useState();

  const onSubmit = (data) => {
    if (data.email && data.password) {
      const body = {
        email: data.email,
        password: data.password,
      };
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(`${BACKEND}/login`, options)
        .then(async (response) => {
          const parsedResponse = await response.json();

          if (response.ok) {
            return parsedResponse;
          }

          const errorInfo = {
            message: parsedResponse.error || 'Oopss!',
          };

          let newError = new Error();
          newError = { ...newError, ...errorInfo };
          return Promise.reject(newError);
        })
        .then((user) => {
          setSessionUser({ token: user.token, user: user.user });
          saveRole(user.role);
          history.push(RESTAURANT_LIST_PAGE);
        })
        .catch((err) => {
          const parsedError = err;
          setError(parsedError);
        });
    }
  };

  return (
    <div>
      <h1>LOG IN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        {errors.email && <span>This field is required</span>}
        <input
          type="text"
          id="email"
          {...register('email', {
            required: true,
          })}
        />
        <label htmlFor="password">Password</label>
        {errors.password && <span>This field is required</span>}
        <input
          type="password"
          id="password"
          {...register('password', {
            required: true,
          })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LogIn;
