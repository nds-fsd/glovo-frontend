import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './userRow.module.css';
import ChangeRoleToolTip from './changeRoleToolTip';

export const UserRow = ({ user }) => {
  const [openToolTip, setOpenToolTip] = useState(false);

  return (
    <div className={styles.row}>
      {user && (
        <>
          <div
            className={`${styles.column} ${styles.name}`}
            style={{ width: '20%', color: 'var(--salyBlack)' }}
            onClick={() => {}}
          >
            {`${user.firstName} ${user.lastName ? user.lastName : ''}`}
          </div>
          <div className={styles.column} style={{ width: '15%' }}>
            <p style={{ color: 'var(--salyBlue)' }}> {user.role} </p>
          </div>
          <div className={styles.email}>{user.email}</div>
          <div className={styles.column} style={{ width: '20%' }}>
            {user.createdAt.slice(0, 10)}
          </div>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon
              icon="ellipsis-v"
              className={styles.icon}
              onClick={() => setOpenToolTip(!openToolTip)}
            />
            <ChangeRoleToolTip
              open={openToolTip}
              onClose={() => setOpenToolTip(false)}
              user={user}
            />
          </div>
        </>
      )}
    </div>
  );
};
