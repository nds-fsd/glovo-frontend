/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import RestaurantViewPage from './pages/restaurantViewPage';
import RestaurantListPage from './pages/restaurantListPage';
import { RESTAURANT_VIEW_PAGE, RESTAURANT_LIST_PAGE, BACKOFFICE } from './router/router';
import { RestoListContextProvider } from './components/context/restoListPageContext';
import { RoleContextProvider } from './components/context/roleContext';
import { PrivateRoute } from './components/privateRoute/privateRoute.view';
import BackOfficePage from './pages/backOfficePage';
import { BackOfficeContextProvider } from './components/context/backOfficeContext';
import { RoleController } from './components/roleController/roleController';
import { CartContextProvider } from './context/cartContext';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

function App() {
  return (
    <Router>
      <RoleContextProvider>
        <Switch>
          <PrivateRoute path={`${BACKOFFICE}/:id?`}>
            <BackOfficeContextProvider>
              <RoleController roleConfirm="PROVIDER">
                <BackOfficePage />
              </RoleController>
            </BackOfficeContextProvider>
          </PrivateRoute>
          <Route path={RESTAURANT_LIST_PAGE}>
            <CartContextProvider>
              <RestoListContextProvider>
                <RestaurantListPage />
              </RestoListContextProvider>
            </CartContextProvider>
          </Route>
          <PrivateRoute path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <CartContextProvider>
              <RestaurantViewPage />
            </CartContextProvider>
          </PrivateRoute>
          <Route path="/" exact>
            <Redirect to={RESTAURANT_LIST_PAGE} />
          </Route>
        </Switch>
      </RoleContextProvider>
    </Router>
  );
}

export default App;
