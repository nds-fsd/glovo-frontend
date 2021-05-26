import { useContext } from 'react';
import styles from './dropdown.module.css';
import { roleContext } from '../../context/roleContext';

export const Dropdown = ({ children }) => {
  const { setProfileDropOpen } = useContext(roleContext);
  return (
    <div>
      <div className={styles._overlay} onClick={() => setProfileDropOpen(false)}></div>
      <div className={styles._container}>{children}</div>
    </div>
  );
};
