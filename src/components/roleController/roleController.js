import { useContext, useEffect } from 'react';
import { roleContext } from '../context/roleContext';

export const RoleController = ({ roleConfirm, children }) => {
  const { role, confirmRole } = useContext(roleContext);
  useEffect(() => {
    confirmRole(roleConfirm);
  }, [role]);
  return children;
};
