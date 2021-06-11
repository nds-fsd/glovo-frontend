/* eslint-disable no-useless-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileInfoLine.module.css';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { USER } from '../../../../router/router';
import { roleContext } from '../../../context/roleContext';

export const ProfileInfoLine = ({ label, schemaProperty, userDetailsKey }) => {
  const { userDetails, confirmRole } = useContext(roleContext);
  const { register, formState, handleSubmit, setError } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data) => {
    if (!(data[schemaProperty] === userDetails[schemaProperty]) || data.length < 0) {
      shortFetch({
        url: `${USER}/${userDetails._id}`,
        body: {
          [schemaProperty]: data[schemaProperty],
        },
        method: 'PATCH',
        token: true,
        onSuccess: () => {
          setIsEditing(!isEditing);
          confirmRole('client');
        },
        onError: (err) => {
          setError(err);
        },
      });
      setIsEditing(!isEditing);
      return;
    }
  };

  return (
    <div className={styles.container}>
      {console.log(userDetails)}
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <span className={styles.inputTitle}>{label}</span>
          <div className={styles.inputSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder={userDetails[schemaProperty]}
              {...register(`${schemaProperty}`, { required: true })}
            />
            {formState.errors[schemaProperty] && (
              <span className={styles.errorMessage}>
                {formState.errors[schemaProperty].message}
              </span>
            )}
            <div className={styles.sendOrCxl}>
              <input type="submit" value="submit" className={styles.submit} />
              <FontAwesomeIcon
                icon="times-circle"
                className={styles._iconClose}
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          </div>
        </form>
      ) : (
        <div>
          <span>{label}</span>
          <div className={styles.textEditingFalse}>
            <span className={styles.userInfo}>{userDetails[userDetailsKey]}</span>
            <FontAwesomeIcon
              icon={userDetails[userDetailsKey] ? 'brush' : 'plus'}
              onClick={() => setIsEditing(!isEditing)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
