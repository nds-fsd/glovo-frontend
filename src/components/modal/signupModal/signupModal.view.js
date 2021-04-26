import React from 'react';
import Modal from '..';
import OtherSignUpForm from '../../forms/signUpForm';

export const SignupModal = ({ onClose, open }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <OtherSignUpForm />
    </Modal>
  );
};
