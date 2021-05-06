import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { getUserSession } from '../../assets/utils/localStorage.utils';
import { BACKOFFICE, RESTAURANT } from '../../router/router';

export const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [hasARestaurant, setHasARestaurant] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Restaurant');
  const history = useHistory();

  useEffect(() => {
    const userId = getUserSession().id;
    shortFetch({
      url: `${RESTAURANT}/search`,
      method: 'POST',
      body: {
        user: userId,
      },
      token: true,
      onSuccess: (restaurant) => {
        if (restaurant[0]._id) {
          history.push(`${BACKOFFICE}/${restaurant[0]._id}`);
          setHasARestaurant(true);
          return;
        }
        setHasARestaurant(false);
      },
    });
  }, []);

  const changeTab = (newTab) => {
    setSelectedTab(newTab);
  };

  const value = {
    hasARestaurant,
    setHasARestaurant,
    selectedTab,
    changeTab,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};
