/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Checkbox from '../checkbox/checkbox.view';
import Paginator from '../paginator';
import RestaurantSelect from '../restaurantSelect';
import styles from './ordersTab.module.css';

let filteredPages;
let totalPages;

export const OrdersTab = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(true);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedThing, setSelectedThing] = useState('');

  console.debug(selectedThing);
  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>Orders</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.restaurantSelectContainer}>
          <RestaurantSelect onChange={(e) => setSelectedRestaurant(e.target.value)} />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            onChange={() => setSelectedThing(undefined)}
            name="status"
            value="All"
            label="All"
            id="All"
          />
          <Checkbox
            onChange={() => setSelectedThing(false)}
            name="status"
            value="incomplete"
            label="Incomplete"
            id="Incomplete"
          />
          <Checkbox
            onChange={() => setSelectedThing(true)}
            name="status"
            value="true"
            label="Complete"
            id="Complete"
          />
        </div>
        <div className={styles.orders}></div>
        <footer className={styles.footer}>
          <div className={styles.limit}>
            <p>Rows per Page</p>
            <select
              name="pagination"
              id="pagination"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
              style={{ backgroundColor: 'var(--lightSalyGray)' }}
            >
              <option value="1">1</option>
              <option value="5" selected>
                5
              </option>
              <option value="10">10</option>
            </select>
          </div>
          <Paginator
            totalPages={filteredPages || totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => setCurrentPage(page)}
          />
        </footer>
      </div>
    </>
  );
};
