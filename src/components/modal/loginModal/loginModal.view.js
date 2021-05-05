import React from 'react';
import Modal from '..';
import Login from '../../logIn';

export const LoginModal = ({ onClose, open, openRegister }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Login openRegister={openRegister} onClose={onClose} />
    </Modal>
  );
};
