import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import RestaurantCreationPage from './pages/restaurantCreationPage';
import RestaurantViewPage from './pages/restaurantViewPage';
import RestaurantListPage from './pages/restaurantListPage';
import MenuEditPage from './pages/menuEditPage';
import {
  RESTAURANT_CREATION_PAGE,
  RESTAURANT_VIEW_PAGE,
  RESTAURANT_LIST_PAGE,
  RESTAURANT_MENU_EDIT,
  PROFILE_PAGE,
} from './router/router';
import { RestoListContextProvider } from './components/context/restoListPageContext';
import ProfilePage from './pages/profilePage';
import { RoleContextProvider } from './components/context/roleContext';
import { PrivateRoute } from './components/privateRoute/privateRoute.view';

function App() {
  return (
    <Router>
      <RoleContextProvider>
        <Switch>
          <Route path={RESTAURANT_LIST_PAGE}>
            <RestoListContextProvider>
              <RestaurantListPage />
            </RestoListContextProvider>
          </Route>
          <Route path={`${RESTAURANT_CREATION_PAGE}/:section?/:id?`}>
            <RestaurantCreationPage />
          </Route>
          <Route path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <RestaurantViewPage />
          </Route>
          <Route path={`${RESTAURANT_MENU_EDIT}/:id`}>
            <MenuEditPage />
          </Route>
          <Route path={`${PROFILE_PAGE}`}>
            <ProfilePage />
          </Route>
          <Route path="/" exact>
            <Redirect to={RESTAURANT_LIST_PAGE} />
          </Route>
          <Route path="/loginPage">
            <ProfilePage />
          </Route>
          <PrivateRoute path={RESTAURANT_LIST_PAGE}>
            <RestaurantListPage />
          </PrivateRoute>
          <PrivateRoute path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <RestaurantViewPage />
          </PrivateRoute>
          {/* <PrivateRoute path={`/${BACKOFFICE_PAGE}/:id`}>
            <BackOfficePage />
        </PrivateRoute> */}
          <Route path="/">
            <Redirect to="loginPage" />
          </Route>
        </Switch>
      </RoleContextProvider>
    </Router>
  );
}

export default App;
