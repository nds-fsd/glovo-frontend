/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
// splice the array before mapping
/* eslint-disable react/no-array-index-key */
// add the id of the categoryin the mapas key
/* eslint-disable no-console */
import styles from './categoryItem.module.css';
import { testCategoryList } from '../../assets/hardcoded/TestCategoryList';

export const CategoryItem = () => {
  return (
    <div className={styles.container}>
      {testCategoryList.map((category, index) => {
        if (index <= 5) {
          return (
            <div className={styles.categoryItem} key={index}>
              <p>{category}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
