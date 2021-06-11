/* eslint-disable no-useless-escape */

/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './signUpForm.module.css';
import { setSessionUser } from '../../../assets/utils/localStorage.utils';
import { roleContext } from '../../context/roleContext';
import registerImage from '../../../assets/images/registerImage.jpg';
import { BACKEND } from '../../../router/router';

export const SignUpForm = ({ openLogin, onClose }) => {
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
        firstName: data.firstName,
      };
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(`${BACKEND}/register`, options)
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
    <div className={styles.mainContainer}>
      <img className={styles.registerImage} src={registerImage} alt="Two people in a meeting" />
      <h2 className={styles.accountLogin}>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {errors.firstName && (
          <span className={styles.errorMessage}>{errors.firstName.message}</span>
        )}
        <div
          className={classNames([styles.inputContainer], { [styles.onError]: errors.firstName })}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Your Name"
            {...register('firstName', { required: true })}
          />
          <FontAwesomeIcon icon="user" style={{ color: 'var(--salyGray)' }} />
        </div>
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        <div
          className={classNames(
            [styles.inputContainer],
            { [styles.onError]: errors.email },
            { [styles.passwordError]: errors.password && errors.password.message }
          )}
        >
          <input
            className={styles.input}
            type="text"
            id="email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email format',
              },
            })}
          />
          <FontAwesomeIcon
            icon="envelope"
            style={{
              color: `${!errors.email ? 'var(--darkSalyBlue)' : 'var(--salyGray)'}`,
            }}
          />
        </div>
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        <div
          className={classNames([styles.inputContainer], {
            [styles.onError]: errors.password,
          })}
        >
          <input
            className={styles.input}
            type={`${!viewPassword ? 'password' : 'text'}`}
            id="password"
            placeholder="Password"
            {...register('password', {
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                message:
                  'Password must contain at least 1 num, 1 lowercase, 1 uppercase and min 8 characters',
              },
              required: 'Password is required',
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
        Already a Team Member?
        <span className={styles.registerLink} onClick={openLogin}>
          LOG IN
        </span>
      </p>
    </div>
  );
};
