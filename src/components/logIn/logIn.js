/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
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
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((user) => {
          setSessionUser({ token: user.token, user: user.user });
          saveRole(user.role);
          history.push(RESTAURANT_LIST_PAGE);
        })
        .catch((err) => {
          return console.log(err);
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
