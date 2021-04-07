import React, { useState } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RestaurantForm from '../../components/restaurantForm';
import DishForm from '../../components/dishForm';
import styles from './restaurantCreationPage.module.css';
import DishList from '../../components/dishList';
import CategoryForm from '../../components/categoryForm';
// import { RESTAURANT_CREATION_PAGE } from '../../router/router';

export const RestaurantCreationPage = () => {
  //   const history = useHistory();
  const { path, url } = useRouteMatch();
  const [enableButtons, setEnableButtons] = useState(false);
  const [createdRestaurant, setCreatedRestaurant] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <span>
          <button>
            <Link to={`${path}/restaurantInfo`}>Restaurant Info</Link>
          </button>
          {enableButtons && (
            <>
              <button>
                <Link to={`${path}/newDish/${createdRestaurant._id}`}>Add a Dish</Link>
              </button>
              <button>
                <Link to={`${path}/Categories/${createdRestaurant._id}`}>categories</Link>
              </button>
              <button>
                <Link to={`${path}/fullMenu/${createdRestaurant._id}`}>Full Menu</Link>
              </button>
            </>
          )}
        </span>
        <span>
          <button>
            <Link to="/">Exit</Link>
          </button>
        </span>
      </div>
      <Switch>
        <Route path={`${url}/restaurantInfo`}>
          <RestaurantForm
            enableButtons={() => setEnableButtons(true)}
            storeCreated={(restaurantId) => setCreatedRestaurant(restaurantId)}
          />
        </Route>
        <Route path={`${url}/newDish/:id`}>
          <DishForm />
        </Route>
        <Route path={`${url}/fullMenu/:id`}>
          <DishList />
        </Route>
        <Route path={`${url}/Categories/:id`}>
          <CategoryForm />
        </Route>
        <Route path={`${url}/`}>
          <Redirect to={`${url}/restaurantInfo`} />
        </Route>
      </Switch>
    </div>
  );
};
