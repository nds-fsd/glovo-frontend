/* eslint-disable no-console */
import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { getUserSession } from '../../assets/utils/localStorage.utils';

export const roleContext = createContext();

export const RoleContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [userDetails, setUserDetails] = useState('');
  const history = useHistory();
  const [profileDropOpen, setProfileDropOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [categoryArr, setCategoryArr] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const confirmRole = (decision) => {
    if (role !== decision || (!role && getUserSession())) {
      shortFetch({
        url: `/user/${getUserSession().id}`,
        method: 'GET',
        token: true,
        onSuccess: (user) => {
          const rol = user.role;
          setRole(rol);
          setUserDetails(user);
          if (rol !== `${decision}`) {
            history.push('/');
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
    profileDropOpen,
    setProfileDropOpen,
    userDetails,
    setUserDetails,
    editingProfile,
    setEditingProfile,
    categoryArr,
    setCategoryArr,
    isSearching,
    setIsSearching,
  };

  return <roleContext.Provider value={value}>{children}</roleContext.Provider>;
};
