import React from 'react';
import Modal from '..';
import SignUpForm from '../../forms/signUpForm';

export const SignupModal = ({ onClose, open, openLogin }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <SignUpForm openLogin={openLogin} onClose={onClose} />
    </Modal>
  );
};
