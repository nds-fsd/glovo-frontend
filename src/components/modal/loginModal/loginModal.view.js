import React from 'react';
import Modal from '..';
import Login from '../../login';

export const LoginModal = ({ onClose, open, openRegister }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Login openRegister={openRegister} onClose={onClose} />
    </Modal>
  );
};
