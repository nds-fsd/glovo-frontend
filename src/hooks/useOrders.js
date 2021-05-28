/* eslint-disable no-debugger */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { ORDERS } from '../router/router';

export const useOrders = () => {
  const [orders, setOrders] = useState({ count: 0, list: [] });
  const [hasOrders, setHasOrders] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = ({ restaurant, sort, dir, page, limit, status }) => {
    setIsLoading(true);
    shortFetch({
      url: `${ORDERS}/search?restaurant=${restaurant}&sort=${sort}&dir=${dir}&page=${page}&limit=${limit}&status=${status}`,
      method: 'GET',

      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);
        if (payload.count === 0) {
          setHasOrders(false);
          return;
        }
        setOrders(payload);
        setHasOrders(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  };

  const getOneOrder = (orderId, onSuccess) => {
    setIsLoading(true);
    shortFetch({
      url: `${ORDERS}/${orderId}`,
      method: 'GET',
      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);
        onSuccess(payload);
      },
    });
  };

  const toggleOrder = ({ orderId, onSuccess }) => {
    setIsLoading(true);
    shortFetch({
      url: `${ORDERS}/${orderId}`,
      method: 'PATCH',
      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);
        onSuccess(payload);
      },
    });
  };

  return {
    orders,
    getOrders,
    toggleOrder,
    totalPages,
    hasOrders,
    getOneOrder,
    isLoading,
  };
};
