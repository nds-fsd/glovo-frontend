import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './categoryTags.module.css';

export const CategoryTags = ({ categoryNames, onClick }) => {
  return (
    <div className={styles.categoryDisplay}>
      <div className={styles.categoryTags}>
        {categoryNames.length > 0 &&
          categoryNames.sort().map((cat) => (
            <div className={styles.tag}>
              <p>{cat.name}</p>{' '}
              <FontAwesomeIcon
                icon="times"
                onClick={() => {
                  onClick(cat);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
