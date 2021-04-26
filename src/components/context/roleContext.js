import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { getUserSession } from '../../assets/utils/localStorage.utils';

export const roleContext = createContext();

export const RoleContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const history = useHistory();

  const confirmRole = (decision) => {
    if (role !== decision || (!role && getUserSession())) {
      shortFetch({
        url: `/user/${getUserSession().id}`,
        method: 'GET',
        onSuccess: (user) => {
          const rol = user.role;
          setRole(rol);
          if (rol !== `${decision}`) {
            history.push('/dasOnlyForClients');
          }
          return true;
        },
      });
    }
  };

  const saveRole = (value) => {
    if (value) {
      setRole(value);
    }
  };

  const value = {
    role,
    saveRole,
    confirmRole,
  };

  return <roleContext.Provider value={value}>{children}</roleContext.Provider>;
};
