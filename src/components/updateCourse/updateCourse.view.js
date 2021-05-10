import UpdateCourseForm from '../forms/updateCourseForm/updateCourseForm.view';
import Modal from '../modal';

const UpdateCourse = ({ open, onClose, onToggle, courseId }) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} title="Update Course">
        <UpdateCourseForm onClose={onClose} onToggle={onToggle} courseId={courseId} />
      </Modal>
    </div>
  );
};

export default UpdateCourse;
