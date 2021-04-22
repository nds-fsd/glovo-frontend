/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import {useParams} from 'react-router-dom'; 
import {shortFetch} from '../../assets/utils/fetch.utils';
import { DISH } from '../../router/router';
import Modal from '../modal';

const CreateDish = ({ open, onClose, courseId }) => {
  const {id} = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    shortFetch({
      url: DISH,
      method: 'POST',
      body: {name: data.name,
      price: data.price,
      Course: courseId.id,
      Restaurant: id,
      },
    });
    reset({
      name: '',
      price:'',
    });
    onClose();
  };
  return (
    <div>
      <Modal open={open} onClose={onClose} title="Create a dish">
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        {errors && errors.name && <span>This field is required</span>}
        <input
            {...register('name', {
              required: true,
            })}
            id="name"
          />
          <label htmlFor="price">Price</label>
          {errors && errors.price && <span>{errors.price.message}</span>}
        <input
            {...register('price', {
              required: true,
              pattern: { value: /^-?\d+\.?\d*$/, message: 'Only numbers' }
            })}
            id="price"
          />
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default CreateDish;
