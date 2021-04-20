/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { styles } from './logIn.module.css';
import { BACKEND } from '../../router/router';

const LogIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
          console.log(user);
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  };

  return (
    <div className={styles._container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        {errors.email && <span>This field is required</span>}
        <input
          id="email"
          {...register('email', {
            required: true,
          })}
        />
        <label htmlFor="password">Password</label>
        {errors.password && <span>This field is required</span>}
        <input
          id="password"
          {...register('email', {
            required: true,
          })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LogIn;
