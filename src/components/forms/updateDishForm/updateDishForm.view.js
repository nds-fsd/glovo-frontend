/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import styles from './updateDishForm.module.css';
import { DISH } from '../../../router/router';

const UpdateDishForm = ({ selectedDish, onToggle, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submit = (data) => {
    shortFetch({
      url: `${DISH}/${selectedDish.id}`,
      method: 'PATCH',
      body: { name: data.name, price: data.price },
      onSuccess: onToggle(),
    });
    reset({
      name: '',
      price: '',
    });
    onClose();
  };

  return (
    <div>
      <div className={styles._container}>
        <form onSubmit={handleSubmit(submit)} className={styles._formContainer}>
          <label htmlFor="name">Name</label>
          {errors && errors.name && <span>This field is required</span>}
          <input
            {...register('name', {
              required: true,
            })}
            id="name"
          />
          {/* <label htmlFor="description">Description</label>
          {errors && errors.description && <span>The description is too short</span>}
          <input
            {...register('description', {
              required: true,
              minLength: 10,
            })}
            id="description"
          /> */}
          <label htmlFor="price">Price</label>
          {errors && errors.price && <span>{errors.price.message}</span>}
          {errors && errors.price && <span>This field is required</span>}
          <input
            type="text"
            {...register('price', {
              required: true,
              pattern: { value: /^-?\d+\.?\d*$/, message: 'Only numbers' },
            })}
            id="price"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UpdateDishForm;
