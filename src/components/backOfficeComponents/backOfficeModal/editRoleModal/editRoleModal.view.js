import React, { useState } from 'react';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './editRoleModal.module.css';
import { usePage } from '../../../../hooks/usePage';
import check from '../../../../assets/images/animation_500_kp9ok9m7.gif';

const roles = ['CLIENT', 'PROVIDER'];

export const EditRoleModal = ({ onClose, open }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [newRole, setNewRole] = useState(roles[0]);
  const {
    userState: { user },
  } = useBackOfficeContext();
  const { createOrEditElement: changeUserRole } = usePage('user');

  const handleSuccess = () => {
    setIsUpdated(true);
  };

  const handleClick = () => {
    if (newRole && roles.includes(newRole)) {
      changeUserRole({
        body: {
          role: newRole,
        },
        id: user._id,
        onSuccess: handleSuccess,
      });
    }
  };

  return (
    <BackOfficeModal
      onClose={() => {
        onClose();
        setIsUpdated(false);
      }}
      open={open}
    >
      <div className={styles.container}>
        {!isUpdated && (
          <>
            <h3>Choose New Role</h3>

            <select
              name="role"
              id="role"
              onChange={(e) => setNewRole(e.target.value)}
              style={{ alignSelf: 'center' }}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button buttonStyle="primary" onClick={() => handleClick()}>
                Update
              </Button>
            </div>
          </>
        )}
        {isUpdated && (
          <div className={styles.isUpdated}>
            <img className={styles.image} src={check} alt="check" />
            <h3>Updated Successfully</h3>
          </div>
        )}
      </div>
    </BackOfficeModal>
  );
};
