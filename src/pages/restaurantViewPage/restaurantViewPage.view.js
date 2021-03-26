import React from 'react';
import styles from './restaurantViewPage.module.css';
import NavBar from '../../components/navBar';
import DishList from '../../components/dishList';

export const RestaurantViewPage = () => {
    return (
        <div>
            <NavBar />
            <DishList />
        </div>
    )
};
