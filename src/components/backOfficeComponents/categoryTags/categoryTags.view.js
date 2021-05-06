import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './categoryTags.module.css';

export const CategoryTags = ({ categoryNames, onClick, tagType }) => {
  const selectedStyle = classNames({
    [styles.create]: tagType === 'create',
    [styles.view]: tagType === 'view',
    [styles.edit]: tagType === 'edit',
  });
  return (
    <div className={styles.categoryDisplay}>
      <div className={styles.categoryTags}>
        {categoryNames &&
          categoryNames.length > 0 &&
          categoryNames.sort().map((cat) => (
            <div key={cat._id} className={selectedStyle}>
              <p>{cat.name}</p>{' '}
              {tagType !== 'view' && (
                <FontAwesomeIcon
                  icon="times"
                  onClick={() => {
                    onClick(cat);
                  }}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
