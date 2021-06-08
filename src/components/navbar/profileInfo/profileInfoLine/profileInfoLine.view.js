/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileInfoLine.module.css';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { USER } from '../../../../router/router';
import { roleContext } from '../../../context/roleContext';

export const ProfileInfoLine = ({ label, schemaProperty, userDetailsKey }) => {
  const { userDetails, confirmRole } = useContext(roleContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    shortFetch({
      url: `${USER}/${userDetails._id}`,
      body: {
        [schemaProperty]: data[schemaProperty],
      },
      method: 'PATCH',
      token: true,
      onSuccess: (user) => {
        console.log(user);
        setIsEditing(!isEditing);
        confirmRole('client');
      },
      onError: (err) => {
        setError(err);
      },
    });
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {console.log(userDetails)}
          <span>{label}</span>
          <input
            className={styles.input}
            type="text"
            placeholder={userDetails[schemaProperty]}
            {...register(`${schemaProperty}`, { required: true })}
          />
          {errors[schemaProperty] && (
            <span className={styles.errorMessage}>{errors[schemaProperty].message}</span>
          )}
          <input type="submit" />
        </form>
      ) : (
        <div>
          <span>{label}</span>
          <div className={styles.textEditingFalse}>
            <span>{userDetails[userDetailsKey]}</span>
            <FontAwesomeIcon icon="brush" onClick={() => setIsEditing(!isEditing)} />
          </div>
        </div>
      )}
    </div>
  );
};
