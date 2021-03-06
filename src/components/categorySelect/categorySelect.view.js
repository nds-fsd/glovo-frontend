import React, { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT_CATEGORY } from '../../router/router';
import styles from './categorySelect.module.css';

export const CategorySelect = React.forwardRef(({ onChange, onBlur, name, label }, ref) => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    shortFetch({
      url: `${RESTAURANT_CATEGORY}`,
      onSuccess: setCategoryList,
      method: 'GET',
      token: true,
    });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <label htmlFor="select">{label}</label>
      <select className={styles.select} name={name} ref={ref} onBlur={onBlur} onChange={onChange}>
        <option value="" selected disabled hidden>
          Select a Category
        </option>
        {categoryList.map((cat) => (
          <option key={cat._id} value={cat._id} name={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
});
