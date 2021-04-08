/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, useParams } from 'react-router-dom';
import RestaurantForm from '../../components/forms/restaurantForm';
import DishForm from '../../components/forms/dishForm';
import styles from './restaurantCreationPage.module.css';
import DishList from '../../components/dishList';
import CourseForm from '../../components/forms/courseForm';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { COURSE, RESTAURANT_CREATION_PAGE } from '../../router/router';
// import { RESTAURANT_CREATION_PAGE } from '../../router/router';

export const RestaurantCreationPage = () => {
  //   const history = useHistory();
  const { id, section } = useParams();
  const [enableButtons, setEnableButtons] = useState(id && section);
  const [createdRestaurant, setCreatedRestaurant] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [toggle, setToggle] = useState(false);

  console.debug(id, section);
  useEffect(() => {
    if (!id) {
      return null;
    }
    shortFetch({
      url: `${COURSE}/search`,
      method: 'POST',
      body: { Restaurant: id },
      onSuccess: setCourseList,
    });
  }, [toggle]);

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <span>
          {!enableButtons && (
            <button>
              <Link to={`${RESTAURANT_CREATION_PAGE}/restaurantInfo/`}>Restaurant Info</Link>
            </button>
          )}
          {enableButtons && (
            <>
              <button>
                <Link to={`${RESTAURANT_CREATION_PAGE}/courses/${createdRestaurant._id}`}>
                  categories
                </Link>
              </button>
              <button>
                <Link to={`${RESTAURANT_CREATION_PAGE}/newDish/${createdRestaurant._id}`}>
                  Add a Dish
                </Link>
              </button>
              <button>
                <Link to={`${RESTAURANT_CREATION_PAGE}/fullMenu/${createdRestaurant._id}`}>
                  Full Menu
                </Link>
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
      <Route path={RESTAURANT_CREATION_PAGE} exact>
        <Redirect to={`${RESTAURANT_CREATION_PAGE}/restaurantInfo`} />
      </Route>
      {section === 'restaurantInfo' && (
        <RestaurantForm
          enableButtons={() => setEnableButtons(true)}
          storeCreated={(restaurant) => setCreatedRestaurant(restaurant)}
        />
      )}
      {section === 'fullMenu' && <DishList />}
      {section === 'newDish' && <DishForm courseList={courseList} />}
      {section === 'courses' && (
        <CourseForm toggle={() => setToggle(!toggle)} courseList={courseList} />
      )}
    </div>
  );
};
