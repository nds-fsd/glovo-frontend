/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Modal from '../modal';
import { COURSE } from '../../router/router';

const CreateCourse = ({ open, onClose, onToggle }) => {
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
      <Modal open={open} onClose={onClose} title="Create Course">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors && errors.name && <span>This field is required</span>}
          <input
            {...register('name', {
              required: true,
            })}
            id="name"
          />
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default CreateCourse;
