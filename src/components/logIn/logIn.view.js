/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './logIn.module.css';
import { BACKEND } from '../../router/router';
import { setSessionUser } from '../../assets/utils/localStorage.utils';
import { roleContext } from '../context/roleContext';
import loginImage from '../../assets/images/loginImage.jpg';

export const Login = ({ openRegister, onClose }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const { saveRole } = useContext(roleContext);

  const onSubmit = (data) => {
    setIsSubmitting(true);
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
          setIsSubmitting(false);
          onClose();
        })
        .catch((err) => {
          setIsSubmitting(false);
          Object.keys(err.message).forEach((key) => {
            setError(key, {
              type: 'manual',
              message: err.message[key],
            });
          });
        });
    }
  };

  return (
    <div className={styles.mainContainer} data-cy="login-form">
      <img className={styles.loginImage} src={loginImage} alt="Two people in a meeting" />
      <h3 className={styles.welcome}>WELCOME BACK</h3>
      <h2 className={styles.accountLogin}>Account Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <div className={classNames([styles.inputContainer], { [styles.onError]: errors.email })}>
          <input
            className={styles.input}
            type="text"
            id="email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Please add an email',
            })}
          />
          <FontAwesomeIcon
            icon="envelope"
            style={{ color: `${!errors.email ? 'var(--darkSalyBlue)' : 'var(--salyGray)'}` }}
          />
        </div>
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        <div className={classNames([styles.inputContainer], { [styles.onError]: errors.password })}>
          <input
            className={styles.input}
            type={`${!viewPassword ? 'password' : 'text'}`}
            placeholder="Password"
            id="password"
            {...register('password', {
              required: 'Please add a password',
            })}
          />
          <FontAwesomeIcon
            onClick={() => {
              setViewPassword(!viewPassword);
            }}
            icon={`${!viewPassword ? 'eye' : 'eye-slash'}`}
            style={{ color: 'var(--salyGray)' }}
          />
        </div>
        {isSubmitting && (
          <div className={styles.isSubmitting}>
            <LoadingOutlined />
          </div>
        )}
        {!isSubmitting && (
          <input data-cy="login-submit" className={styles.submit} type="submit" value="Continue" />
        )}
      </form>
      <p className={styles.footer}>
        Don&apos;t you have an account?{' '}
        <span className={styles.registerLink} onClick={openRegister}>
          REGISTER
        </span>
      </p>
      <FontAwesomeIcon icon="info-circle" style={{ color: 'var(--lightSalyBlue)' }} />
    </div>
  );
};
