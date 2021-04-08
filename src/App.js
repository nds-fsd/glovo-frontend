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
} from './router/router';
import RestoDataContextProvider from './context';

function App() {
  return (
    <RestoDataContextProvider>
      <Router>
        <Switch>
          <Route path={RESTAURANT_LIST_PAGE} exact>
            <RestaurantListPage />
          </Route>
          <Route path={RESTAURANT_CREATION_PAGE}>
            <RestaurantCreationPage />
          </Route>
          <Route path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <RestaurantViewPage />
          </Route>
          <Route path={RESTAURANT_MENU_EDIT}>
            <MenuEditPage />
          </Route>
          <Route path="/">
            <Redirect to={RESTAURANT_LIST_PAGE} />
          </Route>
        </Switch>
      </Router>
    </RestoDataContextProvider>
  );
}

export default App;
