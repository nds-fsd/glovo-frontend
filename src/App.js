import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantCreationPage from './pages/restaurantCreationPage';
import { RESTAURANT_CREATION_PAGE } from './router/router';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={RESTAURANT_CREATION_PAGE}>
          <RestaurantCreationPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
