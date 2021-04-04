import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantCreationPage from './pages/restaurantCreationPage';
import RestaurantViewPage from './pages/restaurantViewPage';
// import RestaurantListPage from './pages/restaurantListPage';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_VIEW_PAGE } from './router/router';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={RESTAURANT_CREATION_PAGE}>
          <RestaurantCreationPage />
        </Route>
        <Route path={RESTAURANT_VIEW_PAGE}>
          <RestaurantViewPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
