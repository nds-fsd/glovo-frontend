/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from '../modal';
import UpdateDishForm from '../forms/updateDishForm';

export const DishModal = ({ onClose, open, selectedDish, onToggle }) => {
	return (
		<Modal
			onClose={onClose}
			open={open}
			title="Restaurant Update Form"
			selectedDish={selectedDish}
		>
			<UpdateDishForm selectedDish={selectedDish} onToggle={onToggle} onClose={onClose} />
		</Modal>
	);
};
