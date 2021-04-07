import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import RestaurantCreationPage from './pages/restaurantCreationPage';
import RestaurantViewPage from './pages/restaurantViewPage';
import { RestaurantListPage } from './pages/restaurantListPage/restaurantListPage.view';
import {
  RESTAURANT_CREATION_PAGE,
  RESTAURANT_VIEW_PAGE,
  RESTAURANT_LIST_PAGE,
} from './router/router';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={RESTAURANT_LIST_PAGE} exact>
          <RestaurantListPage />
        </Route>
        <Route path={RESTAURANT_CREATION_PAGE}>
          <RestaurantCreationPage />
        </Route>
        <Route path={RESTAURANT_VIEW_PAGE}>
          <RestaurantViewPage />
        </Route>
        <Route path="/">
          <Redirect to={RESTAURANT_LIST_PAGE} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
