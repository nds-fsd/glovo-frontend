/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profileInfo.module.css';
import { roleContext } from '../../context/roleContext';
import { getUserSession, removeSession } from '../../../assets/utils/localStorage.utils';
import Button from '../../button';
import ProfileInfoLine from './profileInfoLine';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { USER } from '../../../router/router';
import AddressModal from './addressModal';
import Modal from '../../modal';

export const ProfileInfo = ({ onClose }) => {
  const history = useHistory();
  const userSession = getUserSession();
  const { userDetails, setUserDetails } = useContext(roleContext);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (!userDetails) {
      setUserDetails(getUserSession());
    }
  }, [userDetails, userSession]);

  const deleteUser = (userId) => {
    shortFetch({
      url: `${USER}/${userId}`,
      method: 'DELETE',
      token: true,
      onSuccess: () => {
        removeSession();
        history.push('/');
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const logoutFunc = () => {
    removeSession();
    onClose();
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <p>{`¡Hola, ${userDetails.firstName}!`}</p>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.NameEmail}>
          <ProfileInfoLine label="Nombre" schemaProperty="firstName" userDetailsKey="firstName" />
          <ProfileInfoLine
            label="Teléfono"
            schemaProperty="phoneNumber"
            userDetailsKey="phoneNumber"
          />
          <div>
            <span className={styles.fieldHeader}>Email</span>
            <p className={styles.registeredText}>{userDetails.email}</p>
          </div>
        </div>
      </div>
      {!userDetails.fullAddress && !userDetails.coordinates ? (
        <p style={{ cursor: 'pointer' }} onClick={() => setOpenAddressModal(!openAddressModal)}>
          ¿Cuál es tu dirección?
        </p>
      ) : (
        <div>
          <div className={styles.editAddress}>
            <span className={styles.fieldHeader}>Dirección</span>
            <FontAwesomeIcon
              icon="brush"
              onClick={() => setOpenAddressModal(!openAddressModal)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <span className={styles.registeredText}>{userDetails.fullAddress}</span>
        </div>
      )}
      <div className={styles.logoutDelete}>
        <Button
          buttonStyle="delete"
          className={styles.deleteButton}
          onClick={() => setIsDeleting(!isDeleting)}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            logoutFunc();
          }}
          buttonStyle="primary"
        >
          Logout
        </Button>
      </div>

      {openAddressModal && (
        <AddressModal
          open={openAddressModal}
          onClose={() => setOpenAddressModal(!openAddressModal)}
          userDetails={userDetails}
        />
      )}
      {isDeleting && (
        <Modal onClose={() => setIsDeleting(!isDeleting)} open={isDeleting} title="Are You sure?">
          <div className={styles.buttonContainer}>
            <Button buttonStyle="signup" onClick={onClose}>
              Cancel
            </Button>
            <Button buttonStyle="delete" onClick={() => deleteUser(userDetails._id)}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
