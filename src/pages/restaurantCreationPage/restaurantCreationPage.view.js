/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RestaurantForm from '../../components/restaurantForm';
import DishForm from '../../components/dishForm';
import styles from './restaurantCreationPage.module.css';
import DishList from '../../components/dishList';
import CourseForm from '../../components/courseForm';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { COURSE } from '../../router/router';
// import { RESTAURANT_CREATION_PAGE } from '../../router/router';

export const RestaurantCreationPage = () => {
  //   const history = useHistory();
  const { path, url } = useRouteMatch();
  const [enableButtons, setEnableButtons] = useState(false);
  const [createdRestaurant, setCreatedRestaurant] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    shortFetch({
      url: `${COURSE}/search`,
      method: 'POST',
      body: { Restaurant: createdRestaurant._id },
      onSuccess: setCourseList,
    });
  }, [toggle]);

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <span>
          <button>
            <Link to={`${path}/restaurantInfo/${createdRestaurant._id}`}>Restaurant Info</Link>
          </button>
          {enableButtons && (
            <>
              <button>
                <Link to={`${path}/Categories/${createdRestaurant._id}`}>categories</Link>
              </button>
              <button>
                <Link to={`${path}/newDish/${createdRestaurant._id}`}>Add a Dish</Link>
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
        <Route path={`${url}/restaurantInfo`} exact>
          <RestaurantForm
            enableButtons={() => setEnableButtons(true)}
            storeCreated={(restaurant) => setCreatedRestaurant(restaurant)}
          />
        </Route>
        <Route path={`${url}/newDish/:id`}>
          <DishForm courseList={courseList} />
        </Route>
        <Route path={`${url}/fullMenu/:id`}>
          <DishList />
        </Route>
        <Route path={`${url}/Categories/:id`}>
          <CourseForm toggle={() => setToggle(!toggle)} courseList={courseList} />
        </Route>
        <Route path={`${url}/`} exact>
          <Redirect to={`${url}/restaurantInfo`} />
        </Route>
      </Switch>
    </div>
  );
};
