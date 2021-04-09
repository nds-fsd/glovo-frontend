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
import { RestoListContextProvider } from './components/context/restoListPageContext';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={RESTAURANT_LIST_PAGE}>
          <RestaurantListPage />
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
        <RestoListContextProvider>
          <Route path="/" exact>
            <Redirect to={RESTAURANT_LIST_PAGE} />
          </Route>
        </RestoListContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
