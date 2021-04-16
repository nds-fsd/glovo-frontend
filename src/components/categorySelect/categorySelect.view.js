import React, { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT_CATEGORY } from '../../router/router';
import styles from './categorySelect.module.css';

export const CategorySelect = React.forwardRef(({ onChange, onBlur, name, label }, ref) => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    shortFetch({ url: `${RESTAURANT_CATEGORY}`, onSuccess: setCategoryList, method: 'GET' });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <label htmlFor="select">{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="" selected disabled hidden>
          Select a Category
        </option>
        {categoryList.map((cat) => (
          <option value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
});
