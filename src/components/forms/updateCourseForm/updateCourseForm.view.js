/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { COURSE } from '../../../router/router';

const UpdateCourseForm = ({ onClose, onToggle, courseId }) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    shortFetch({
      url: `${COURSE}/${courseId.id}`,
      method: 'PATCH',
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
        <label htmlFor="name">Name</label>
        {errors && errors.name && <span>This field is required</span>}
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

export default UpdateCourseForm;
