import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './dropdown.module.css';

export const Dropdown = ({ children, onClose, open }) => {
  const dropDownRef = useRef();
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
    <div
      className={classNames(
        [styles._container],
        {
          [styles.profileModal]: children.type.name === 'ProfileInfo',
        },
        { [styles.shoppingCart]: children.type.name === 'DeliveryInformation' }
      )}
      ref={dropDownRef}
    >
      {children}
    </div>
  );
};
