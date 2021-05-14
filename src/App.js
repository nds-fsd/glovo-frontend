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
          <CartContextProvider>
            <Route path={RESTAURANT_LIST_PAGE}>
              <RestoListContextProvider>
                <RestaurantListPage />
              </RestoListContextProvider>
            </Route>
            <PrivateRoute path={`${RESTAURANT_VIEW_PAGE}/:id`}>
              <RestaurantViewPage />
            </PrivateRoute>
          </CartContextProvider>
          <PrivateRoute path={`${BACKOFFICE}/:id?`}>
            <BackOfficeContextProvider>
              <RoleController roleConfirm="PROVIDER">
                <BackOfficePage />
              </RoleController>
            </BackOfficeContextProvider>
          </PrivateRoute>
          {/* <Route path={`${RESTAURANT_CREATION_PAGE}/:section?/:id?`}>
            <RestaurantCreationPage />
          </Route>
          <Route path={`${RESTAURANT_MENU_EDIT}/:id`}>
            <MenuEditPage />
          </Route> */}
          <Route path="/" exact>
            <Redirect to={RESTAURANT_LIST_PAGE} />
          </Route>
        </Switch>
      </RoleContextProvider>
    </Router>
  );
}

export default App;
