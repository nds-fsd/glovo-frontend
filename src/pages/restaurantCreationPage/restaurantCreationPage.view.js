import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import RestaurantForm from '../../components/restaurantForm';
import DishForm from '../../components/dishForm';
import styles from './restaurantCreationPage.module.css';
import { DishList } from '../../components/dishList/dishList.view';
// import { RESTAURANT_CREATION_PAGE } from '../../router/router';

export const RestaurantCreationPage = () => {
  //   const history = useHistory();
  const { path, url } = useRouteMatch();
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <span>
          <button>
            <Link to={`${path}/restaurantInfo`}>Restaurant Info</Link>
          </button>
          <button>
            <Link to={`${path}/newDish`}>Add a Dish</Link>
          </button>
          <button>
            <Link to={`${path}/fullMenu`}>Full Menu</Link>
          </button>
        </span>
        <span>
          <button>Exit</button>
        </span>
      </div>
      <Switch>
        <Route path={`${url}/restaurantInfo`}>
          <RestaurantForm />
        </Route>
        <Route path={`${url}/newDish`}>
          <DishForm />
        </Route>
        <Route path={`${url}/fullMenu`}>
          <DishList />
        </Route>
      </Switch>
    </div>
  );
};
