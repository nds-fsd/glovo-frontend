import React from 'react';
import Modal from '..';
import Login from '../../logIn';

export const LoginModal = ({ onClose, open }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Login />
    </Modal>
  );
};
