import { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT_CATEGORY } from '../../router/router';
import styles from './categorySelect.module.css';

export const CategorySelect = ({ categoryValue }) => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    shortFetch({ url: `${RESTAURANT_CATEGORY}`, onSuccess: setCategoryList, method: 'GET' });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <select onChange={(e) => categoryValue(e.target.value)}>
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
