import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { getUserSession } from '../../assets/utils/localStorage.utils';
import { BACKOFFICE, RESTAURANT } from '../../router/router';

export const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [haveARestaurant, setHaveARestaurant] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Restaurant');
  const history = useHistory();

  useEffect(() => {
    shortFetch({
      url: `${RESTAURANT}/search`,
      method: 'POST',
      body: {
        user: getUserSession().id,
      },
      onSuccess: (restaurant) => {
        if (restaurant[0]._id) {
          history.push(`${BACKOFFICE}/${restaurant[0]._id}`);
          setHaveARestaurant(true);
        }
        setHaveARestaurant(false);
      },
    });
  }, []);

  const changeTab = (newTab) => {
    setSelectedTab(newTab);
  };

  const value = {
    haveARestaurant,
    selectedTab,
    changeTab,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};
