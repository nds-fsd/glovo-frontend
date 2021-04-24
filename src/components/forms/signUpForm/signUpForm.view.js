/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './signUpForm.module.css';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { setSessionUser } from '../../../assets/utils/localStorage.utils';
import { RESTAURANT_LIST_PAGE } from '../../../router/router';
import { roleContext } from '../../context/roleContext';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const {saveRole} = useContext(roleContext);

  const onSubmit = (data) => {
    console.log(data);
    shortFetch({
      url: '/register',
      method: 'POST',
      body: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        address: {
          number: data.addressNumber,
          street: data.addressStreet,
          zipcode: data.addressZipcode,
        },
      },
      onSuccess: (response) => {
          console.log(response)
        setSessionUser({ token: response.token, user: response.user });
        saveRole(response.role);
        history.push(RESTAURANT_LIST_PAGE);
      },
    });
  };

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
      {errors.firstName && errors.firstName.type === 'required' && <span>Field is required</span>}
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        {...register('firstName', { required: true })}
      />
      {errors.lastName && errors.lastName.type === 'required' && <span>Field is required</span>}
      <input
        type="text"
        placeholder="Last Name"
        id="LastName"
        ref={register}
        {...register('lastName', {
          required: true,
        })}
      />
      {errors.email && errors.email.type === 'required' && <span>An email is required</span>}
      {errors.email && errors.email.type === 'pattern' && <span>A valid email is required</span>}
      <input
        type="text"
        placeholder="Email"
        {...register('email', {
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors.addressNumber && errors.addressNumber.type === 'maxLength' && (
        <span>Street number must be 5 numbers or less</span>
      )}
      {errors.addressNumber && errors.addressNumber.type === 'required' && (
        <span>Street number is required</span>
      )}
      <input
        type="text"
        id="addressNumber"
        placeholder="Street Number"
        {...register('addressNumber', {
          maxLength: 5,
          required: true,
        })}
      />
      {errors.addressStreet && errors.addressStreet.type === 'required' && (
        <span>Street name is required</span>
      )}
      <input
        type="text"
        placeholder="Street"
        id="addressStreet"
        {...register('addressStreet', {
          required: true,
        })}
      />
      {errors && errors.addressZipcode && <span>{errors.addressZipcode.message}</span>}
      <input
        type="text"
        id="addressZipcode"
        placeholder="Zipcode"
        {...register('addressZipcode', {
          maxLength: {
            value: 5,
            message: 'Zipcode is too long',
          },
          minLength: {
            value: 5,
            message: 'Zipcode is too short',
          },
          required: {
            value: true,
            message: 'Zipcode is required',
          },
        })}
      />
      {errors && errors.password && <span>{errors.password.message}</span>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        {...register('password', {
          minLength: {
            value: 5,
            message: 'Password must be at least 5 character long',
          },
          required: {
            value: true,
            message: 'Password is required',
          },
        })}
      />
      <input type="submit" />
    </form>
  );
};
