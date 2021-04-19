/* eslint-disable prettier/prettier */
/* eslint-disable no-debugger */
/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import styles from './signUpForm.module.css';
import { shortFetch } from '../../../assets/utils/fetch.utils';

export const SignUpForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    debugger;
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
      onSuccess: (response) => console.log(response),
    });
  };

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        {...register('firstName', { required: true, pattern: /[^a-zA-Z]+/})}
      />
      <input
        type="text"
        placeholder="Last Name"
        id="LastName"
        ref={register}
        {...register('lastName', {
          required: true,
          //pattern: /[^a-zA-Z]+/,
        })}
      />
      <input
        type="text"
        id="email"
        placeholder="Email"
        {...register('email', {
          required: true,
          //pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
      />
      <input
        type="text"
        id="addressNumber"
        placeholder="Street Number"
        {...register('addressNumber', {
          maxLength: 6,
          //pattern: /^[0-9]*$/,
        })}
      />
      <input type="text" placeholder="Street" id="addressStreet" {...register('addressStreet')} />
      <input
        type="text"
        id="addressZipcode"
        placeholder="Zipcode"
        {...register('addressZipcode', {
          //pattern: /^[0-9]*$/,
          maxLength: {
            value: 5,
            message: 'Zipcode is too long',
          },
          minLength: {
            value: 4,
            message: 'Zipcode is too short',
          },
        })}
      />
      {errors && errors.addressZipcode && <p>{errors.addressZipcode.message}</p>}
      <input
        type="text"
        id="password"
        placeholder="Password"
        name="password"
        {...register('password')}
      />
      <input type="submit" />
    </form>
  );
};
