import React from 'react';
import Modal from '..';
import { OtherLogin } from '../../logIn/otherLogin/otherLogin';

export const SignupModal = ({ onClose, open }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <OtherLogin />
    </Modal>
  );
};
