/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import Modal from '../modal';
import CreateDishForm from '../forms/createDishForm';

const CreateDish = ({ open, onClose, courseId }) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} title="Create a dish">
        <CreateDishForm onClose={onClose} courseId={courseId} />
      </Modal>
    </div>
  );
};

export default CreateDish;
