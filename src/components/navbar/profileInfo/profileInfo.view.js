/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styles from './profileInfo.module.css';
import { roleContext } from '../../context/roleContext';
import DropDown from '../../modal/dropdown';
import { getUserSession, removeSession } from '../../../assets/utils/localStorage.utils';
import Button from '../../button';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { USER } from '../../../router/router';

export const ProfileInfo = () => {
  const history = useHistory();
  const userSession = getUserSession();
  const { userDetails, setUserDetails, editingProfile, setEditingProfile } = useContext(
    roleContext
  );
  useEffect(() => {
    if (!userDetails) {
      setUserDetails(getUserSession());
    }
  }, [userDetails, userSession]);

  const logoutFunc = () => {
    removeSession();
    history.push('/');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email && data.email)
      shortFetch({
        url: `${USER}/${userDetails._id}`,
        body: {
          email: data.email,
          firstName: data.firstName,
        },
        method: 'PATCH',
        token: true,
        onSuccess: (user) => {
          setEditingProfile(false);
          alert(user.message);
        },
        onError: (err) => {
          setError(err);
        },
      });
  };

  return (
    <DropDown>
      <div className={styles.container}>
        <div className={styles.editButton}>
          <Button onClick={() => setEditingProfile(!editingProfile)} buttonStyle="primary">
            Edit
          </Button>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.welcomeMessage}>
            <p>{`Bienvenido ${userDetails.firstName}`}</p>
          </div>
          <div className={styles.NameEmail}>
            <p>Nombre</p>
            {editingProfile ? (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={userDetails.firstName}
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <span className={styles.errorMessage}>{errors.firstName.message}</span>
                )}
              </form>
            ) : (
              <p>{userDetails.firstName}</p>
            )}
            <p>Email</p>
            {editingProfile ? (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                  className={styles.input}
                  type="text"
                  id="email"
                  placeholder={userDetails.email}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Invalid email format',
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email.message}</span>
                )}
              </form>
            ) : (
              <p>{userDetails.email}</p>
            )}
          </div>
        </div>
        {editingProfile ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input className={styles.submit} type="submit" value="Continue" />
          </form>
        ) : (
          <Button onClick={() => logoutFunc()} buttonStyle="primary">
            Logout
          </Button>
        )}
      </div>
    </DropDown>
  );
};