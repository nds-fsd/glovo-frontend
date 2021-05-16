/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import Checkbox from '../checkbox/checkbox.view';
import Paginator from '../paginator';
import RestaurantSelect from '../restaurantSelect';
import styles from './ordersTab.module.css';
import OrderRow from '../orderRow';

export const OrdersTab = () => {
  const { getOrders, orders, totalPages, hasOrders } = useOrders();
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSort, setSelectedSort] = useState('orderNumber');
  const [direction, setDirection] = useState(false);

  useEffect(() => {
    let parsedDir;
    if (direction) {
      parsedDir = 'asc';
    }
    if (!direction) {
      parsedDir = 'dsc';
    }
    if (!selectedRestaurant) {
      return;
    }
    getOrders({
      restaurant: selectedRestaurant,
      sort: selectedSort,
      dir: parsedDir,
      page: currentPage - 1,
      limit,
      status: selectedStatus,
    });
  }, [selectedRestaurant, selectedSort, direction, currentPage, limit, selectedStatus]);

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>Orders</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.restaurantSelectContainer}>
          <RestaurantSelect onChange={(e) => setSelectedRestaurant(e.target.value)} />
          <Checkbox
            onChange={() => setSelectedStatus('')}
            name="status"
            value="All"
            label="All"
            id="All"
          />
          <Checkbox
            onChange={() => setSelectedStatus(false)}
            name="status"
            value="incomplete"
            label="Incomplete"
            id="Incomplete"
          />
          <Checkbox
            onChange={() => setSelectedStatus(true)}
            name="status"
            value="true"
            label="Complete"
            id="Complete"
          />
        </div>

        <div className={styles.tableHeaders}>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'orderNumber',
            })}
            style={{ width: '50%' }}
            onClick={() => {
              setSelectedSort('orderNumber');
              setDirection(!direction);
            }}
          >
            Order
            {selectedSort === 'orderNumber' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'status',
            })}
            style={{ width: '25%' }}
            onClick={() => {
              setSelectedSort('status');
              setDirection(!direction);
            }}
          >
            Status
            {selectedSort === 'status' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
          <div className={styles.column} style={{ width: '25%' }}>
            Total
          </div>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'createdAt',
            })}
            style={{ width: '25%' }}
            onClick={() => {
              setSelectedSort('createdAt');
              setDirection(!direction);
            }}
          >
            Created At
            {selectedSort === 'createdAt' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
        </div>
        <div className={styles.orders}>
          {hasOrders && orders?.list.map((order) => <OrderRow order={order} />)}
        </div>
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
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => setCurrentPage(page)}
          />
        </footer>
      </div>
    </>
  );
};
