import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUserToken } from '../../assets/utils/localStorage.utils';

export const PrivateRoute = ({ path, children }) => (
  <Route
    path={path}
    render={() => {
      if (getUserToken()) {
        return children;
      }
      return (
        <Route>
          <Redirect to="/loginPage" />
        </Route>
      );
    }}
  />
);
