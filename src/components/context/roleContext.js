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
  const [editingProfileName, setEditingProfileName] = useState(false);
  const [editingProfilePhone, setEditingProfilePhone] = useState(false);
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
            if (rol === 'SUPER_ADMIN') {
              history.push('/backOffice');
            } else {
              history.push('/');
            }
          }
          return true;
        },
      });
    }
  };

  const updateUserDetails = () => {
    shortFetch({
      url: `/user/${getUserSession().id}`,
      method: 'GET',
      token: true,
      onSuccess: (user) => {
        setUserDetails(user);
        return true;
      },
    });
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
    editingProfileName,
    setEditingProfileName,
    categoryArr,
    setCategoryArr,
    isSearching,
    setIsSearching,
    setEditingProfilePhone,
    editingProfilePhone,
    updateUserDetails,
  };

  return <roleContext.Provider value={value}>{children}</roleContext.Provider>;
};
