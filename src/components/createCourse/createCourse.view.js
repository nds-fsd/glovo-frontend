import Modal from '../modal';
import CreateCourseForm from '../forms/createCourseForm';

const CreateCourse = ({ open, onClose, onToggle }) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} title="Create Course">
        <CreateCourseForm onToggle={onToggle} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default CreateCourse;
