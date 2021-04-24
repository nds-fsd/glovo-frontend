import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import RestaurantCreationPage from './pages/restaurantCreationPage';
import RestaurantViewPage from './pages/restaurantViewPage';
import RestaurantListPage from './pages/restaurantListPage';
import LogInPage from './pages/logInPage/index';
import MenuEditPage from './pages/menuEditPage';
import {
  RESTAURANT_CREATION_PAGE,
  RESTAURANT_VIEW_PAGE,
  RESTAURANT_LIST_PAGE,
  RESTAURANT_MENU_EDIT,
} from './router/router';
import { RestoListContextProvider } from './components/context/restoListPageContext';
import { RoleContextProvider } from './components/context/roleContext';
import { PrivateRoute } from './components/privateRoute/privateRoute.view';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

function App() {
  return (
    <Router>
      <RoleContextProvider>
        <Switch>
          <Route path="/loginPage">
            <LogInPage />
          </Route>
          <PrivateRoute path={RESTAURANT_LIST_PAGE}>
            <RestoListContextProvider>
              <RestaurantListPage />
            </RestoListContextProvider>
          </PrivateRoute>
          <PrivateRoute path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <RestaurantViewPage />
          </PrivateRoute>
          {/* <PrivateRoute path={`/${BACKOFFICE_PAGE}/:id`}>
            <BackOfficePage />
          </PrivateRoute> */}
          <Route path={`${RESTAURANT_CREATION_PAGE}/:section?/:id?`}>
            <RestaurantCreationPage />
          </Route>
          <Route path={`${RESTAURANT_MENU_EDIT}/:id`}>
            <MenuEditPage />
          </Route>
          <Route path="/">
            <Redirect to="loginPage" />
          </Route>
        </Switch>
      </RoleContextProvider>
    </Router>
  );
}

export default App;
