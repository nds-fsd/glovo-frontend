/* eslint-disable no-console */
import { useRef, useEffect } from 'react';
import styles from './dropdown.module.css';
// import { roleContext } from '../../context/roleContext';

export const Dropdown = ({ children, onClose, open }) => {
  const dropDownRef = useRef();
  // const { setProfileDropOpen, profileDropOpen } = useContext(roleContext);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target) && open) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [dropDownRef, open]);
  return (
    <div className={styles._container} ref={dropDownRef}>
      {children}
    </div>
  );
};

// { [styles.open]: profileDropOpen }
