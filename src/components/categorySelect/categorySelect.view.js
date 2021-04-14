import { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT_CATEGORY } from '../../router/router';
import styles from './categorySelect.module.css';

export const CategorySelect = ({ categoryValue, handleChange, label }) => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    shortFetch({ url: `${RESTAURANT_CATEGORY}`, onSuccess: setCategoryList, method: 'GET' });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <label htmlFor="select">{label}</label>
      {!categoryValue && <p>* required</p>}
      <select id="select" onChange={(e) => handleChange(e.target.value)}>
        <option value="" selected disabled hidden>
          Select a Category
        </option>
        {categoryList.map((cat) => (
          <option value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
};
