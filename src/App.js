import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantCreationPage from './pages/restaurantCreationPage';
<<<<<<< HEAD
import RestaurantViewPage from './pages/restaurantViewPage';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_VIEW_PAGE } from './router/router';
=======
import RestaurantListPage from './pages/restaurantListPage';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_LIST_PAGE } from './router/router';
>>>>>>> Development

function App() {
  return (
    <Router>
      <Switch>
        <Route path={RESTAURANT_CREATION_PAGE}>
          <RestaurantCreationPage />
        </Route>
<<<<<<< HEAD
        <Route path={RESTAURANT_VIEW_PAGE}>
          <RestaurantViewPage />
=======
        <Route path={RESTAURANT_LIST_PAGE}>
          <RestaurantListPage />
>>>>>>> Development
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
