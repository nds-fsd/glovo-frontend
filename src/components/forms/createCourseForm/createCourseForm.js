/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { COURSE } from '../../../router/router';

const CreateCourseForm = ({ onClose, onToggle }) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    shortFetch({
      url: COURSE,
      method: 'POST',
      body: { Restaurant: id, name: data.name },
      onSuccess: () => {
        onToggle();
      },
    });
    reset({
      name: '',
    });
    onClose();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors && errors.name && <span>This field is required</span>}
        <label htmlFor="name">Name</label>
        <input
          {...register('name', {
            required: true,
          })}
          id="name"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateCourseForm;
