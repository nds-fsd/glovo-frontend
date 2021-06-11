import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './courseRow.module.css';
import SubMenu from './subMenu';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { VIEW_DISHES } from '../../../pages/backOfficePage/backOfficeContext/types';

export const CourseRow = ({ course, category }) => {
  const { dispatch } = useBackOfficeContext();
  const [subMenu, setSubMenu] = useState(false);

  return (
    <div className={styles.row}>
      {(course || category) && (
        <>
          <div
            className={`${styles.column} ${styles.name}`}
            style={{ width: '32%', color: 'var(--salyBlack)' }}
            onClick={() => {
              if (!category) {
                dispatch({ type: VIEW_DISHES, payload: { name: course.name, id: course._id } });
              }
            }}
          >
            {course?.name || category?.name}
          </div>

          <div className={styles.column} style={{ width: '20%' }}>
            {course?.createdAt?.slice(0, 10) || category?.createdAt?.slice(0, 10)}
          </div>
          <div className={`${styles.column} ${styles.iconContainer}`} style={{ width: '15%' }}>
            <FontAwesomeIcon
              icon="ellipsis-v"
              className={styles.icon}
              onClick={() => setSubMenu(!subMenu)}
            />
            <FontAwesomeIcon icon="bars" className={styles.icon} />
            <SubMenu
              open={subMenu}
              onClose={() => setSubMenu(false)}
              course={course}
              category={category}
            />
          </div>
        </>
      )}
    </div>
  );
};
