import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './rating.module.css';

export const Rating = ({ rating }) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={`${rating >= 0.5 && rating < 1 ? 'star-half-alt' : 'star'}`}
        className={classNames(
          { [styles.enough]: rating >= 0.5 },
          { [styles.notEnough]: rating < 0.5 }
        )}
      />

      <FontAwesomeIcon
        icon={`${rating >= 1.5 && rating < 2 ? 'star-half-alt' : 'star'}`}
        className={classNames(
          { [styles.enough]: rating >= 1.5 },
          { [styles.notEnough]: rating < 1.5 }
        )}
      />

      <FontAwesomeIcon
        icon={`${rating >= 2.5 && rating < 3 ? 'star-half-alt' : 'star'}`}
        className={classNames(
          { [styles.enough]: rating >= 2.5 },
          { [styles.notEnough]: rating < 2.5 }
        )}
      />

      <FontAwesomeIcon
        icon={`${rating >= 3.5 && rating < 4 ? 'star-half-alt' : 'star'}`}
        className={classNames(
          { [styles.enough]: rating >= 3.5 },
          { [styles.notEnough]: rating < 3.5 }
        )}
      />

      <FontAwesomeIcon
        icon={`${rating >= 4.5 && rating < 5 ? 'star-half-alt' : 'star'}`}
        className={classNames(
          { [styles.enough]: rating >= 4.5 },
          { [styles.notEnough]: rating < 4.5 }
        )}
      />
    </div>
  );
};
