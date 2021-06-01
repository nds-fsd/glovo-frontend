/* eslint-disable no-console */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';

export const usePage = (entity = '') => {
  const [hasElements, setHasElements] = useState(false);
  const [elements, setElements] = useState();
  const [totalPages, setTotalPages] = useState();
  const [filteredElements, setFilteredElements] = useState();
  const [filteredPages, setFilteredPages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getElements = ({ page = 0, limit = 10, body, dir, sort }) => {
    setIsLoading(true);
    shortFetch({
      url: `/${entity}/search?page=${page}&sort=${sort}&dir=${dir}&limit=${limit}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);
        if (payload.count === 0) {
          setHasElements(false);
          return;
        }
        setElements(payload);
        setHasElements(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  };

  const filterElements = ({ pag, lim, query, sort, dir }) => {
    setIsLoading(true);
    const body = query;
    shortFetch({
      url: `/${entity}/search?page=${pag}&sort=${sort}&dir=${dir}&limit=${lim}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);

        if (payload.count === 0) {
          setFilteredPages(1);
          setFilteredElements(payload);
          setHasElements(true);
          return;
        }
        setFilteredElements(payload);
        setHasElements(true);
        setFilteredPages(Math.ceil(payload.count / lim));
      },
    });
  };
  const clearFilter = () => {
    setFilteredElements(undefined);
    setFilteredPages(undefined);
  };

  // * construir body fuera y mapear por Ids, las categories
  const createOrEditElement = ({ body, onSuccess, id }) => {
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `/${entity}/${id}` : `/${entity}`;
    shortFetch({
      url,
      method,
      body,
      token: true,
      onSuccess: () => {
        setHasElements(true);
        onSuccess();
      },
    });
  };

  const deleteElement = ({ path, id, onSuccess, onError }) => {
    shortFetch({
      url: `${path}/${id}`,
      token: true,
      method: 'DELETE',
      onSuccess,
      onError,
    });
  };

  return {
    deleteElement,
    hasElements,
    elements,
    totalPages,
    createOrEditElement,
    filteredElements,
    filterElements,
    clearFilter,
    filteredPages,
    getElements,
    isLoading,
  };
};
