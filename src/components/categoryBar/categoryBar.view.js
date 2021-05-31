/* eslint-disable react/no-array-index-key */
import classnames from 'classnames';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { RESTAURANT_LIST_PAGE } from '../../router/router';
import Button from '../button';
import styles from './categoryBar.module.css';

export const CategoryBar = ({ children, open, onClose }) => {
  const history = useHistory();
  const catBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catBarRef.current && !catBarRef.current.contains(e.target) && open) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [catBarRef, open]);

  return (
    <div ref={catBarRef} className={classnames([styles.container], { [styles.open]: open })}>
      <h2>Select a Category</h2>
      {children.map((item) => (
        <div
          key={item._id}
          onClick={(e) =>
            history.push(`${RESTAURANT_LIST_PAGE}/category?name=${e.target.textContent}`)
          }
          id={item._id}
          className={styles.category}
        >
          <p>{item.name}</p>
        </div>
      ))}
      <Button buttonStyle="viewAll" onClick={() => history.push(RESTAURANT_LIST_PAGE)}>
        View All
      </Button>
    </div>
  );
};
