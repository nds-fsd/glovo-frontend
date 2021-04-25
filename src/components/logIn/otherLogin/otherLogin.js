/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './otherLogin.module.css';
import { BACKEND, RESTAURANT_LIST_PAGE } from '../../../router/router';
import { setSessionUser } from '../../../assets/utils/localStorage.utils';
import { roleContext } from '../../context/roleContext';
import loginImage from '../../../assets/images/loginImage.jpg';
import { RestoListContext } from '../../context/restoListPageContext';

export const OtherLogin = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const { setOpenSignupModal, setOpenLoginModal } = useContext(RestoListContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
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
    <div className={styles.mainContainer}>
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
        <input className={styles.submit} type="submit" value="Continue" />
      </form>
      <p className={styles.footer}>
        Don&apos;t you have an account?{' '}
        <span
          className={styles.registerLink}
          onClick={() => {
            setOpenLoginModal(false);
            setOpenSignupModal(true);
          }}
        >
          REGISTER
        </span>
      </p>
      <FontAwesomeIcon icon="info-circle" style={{ color: 'var(--lightSalyBlue)' }} />
    </div>
  );
};
