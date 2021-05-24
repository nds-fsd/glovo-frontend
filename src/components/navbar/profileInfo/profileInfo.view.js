/* eslint-disable no-console */
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profileInfo.module.css';
import { roleContext } from '../../context/roleContext';
import DropDown from '../../modal/dropdown';
import { getUserSession, removeSession } from '../../../assets/utils/localStorage.utils';
import Button from '../../button';

export const ProfileInfo = () => {
  const history = useHistory();
  const userSession = getUserSession();
  const { userDetails, setUserDetails } = useContext(roleContext);
  useEffect(() => {
    if (!userDetails) {
      setUserDetails(getUserSession());
    }
  }, [userDetails, userSession]);

  const logoutFunc = () => {
    removeSession();
    history.push('/');
  };

  return (
    <DropDown>
      <div className={styles.container}>
        {console.log(userDetails)}
        <div className={styles.userInfo}>
          <div className={styles.welcomeMessage}>
            <p>{`Bienvenido ${userDetails.firstName}`}</p>
          </div>
          <div className={styles.NameEmail}>
            <p>Nombre</p>
            <p>{userDetails.firstName}</p>
            <p>Email</p>
            <p>{userDetails.email}</p>
          </div>
        </div>
        <Button onClick={() => logoutFunc()} buttonStyle="primary">
          Logout
        </Button>
      </div>
    </DropDown>
  );
};
