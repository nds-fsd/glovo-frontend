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

export const ProfileInfo = ({ onClose }) => {
  const history = useHistory();
  const userSession = getUserSession();
  const { userDetails, setUserDetails } = useContext(roleContext);
  const [openAddressModal, setOpenAddressModal] = useState(false);
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
      onSuccess: (res) => {
        console.log(res);
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

  // const onSubmit = (data) => {
  //   console.log(data);
  //   shortFetch({
  //     url: `${USER}/${userDetails._id}`,
  //     body: {
  //       firstName: data.firstName,
  //     },
  //     method: 'PATCH',
  //     token: true,
  //     onSuccess: (user) => {
  //       setEditingProfile(false);
  //       alert(user.message);
  //     },
  //     onError: (err) => {
  //       setError(err);
  //     },
  //   });
  // };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <p>{`¡Hola, ${userDetails.firstName}!`}</p>
      </div>
      <div className={styles.userInfo}>
        <p className={styles.userInfoTitle}>Tu Cuenta</p>
        <div className={styles.NameEmail}>
          <p className={styles.fieldHeader}>Nombre</p>
          <div>
            <ProfileInfoLine
              label="firstName"
              schemaProperty="firstName"
              userDetailsKey="firstName"
            />
          </div>
          <div>
            <p className={styles.fieldHeader}>Email</p>
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
            <p className={styles.fieldHeader}>Dirección</p>
            <FontAwesomeIcon
              icon="cog"
              onClick={() => setOpenAddressModal(!openAddressModal)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <p className={styles.registeredText}>{userDetails.fullAddress}</p>
        </div>
      )}
      <div>
        <Button
          onClick={() => {
            logoutFunc();
          }}
          buttonStyle="primary"
        >
          Logout
        </Button>
        <Button buttonStyle="primary" onClick={() => deleteUser(userDetails._id)}>
          Delete
        </Button>
      </div>

      {openAddressModal && (
        <AddressModal
          open={openAddressModal}
          onClose={() => setOpenAddressModal(!openAddressModal)}
          userDetails={userDetails}
        />
      )}
    </div>
  );
};

// <div className={styles.editButton}>
// <FontAwesomeIcon icon="cog" onClick={() => setEditingProfile(!editingProfile)} />
// {console.log(userDetails)}
// </div>
