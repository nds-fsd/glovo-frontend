import React from 'react';
import styles from './dishItem.module.css';

export const DishItem = ({item}) => {
    return (
        <div className={styles._container}>{item}</div>
    )
};
