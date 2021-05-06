import React, { useState } from 'react';
import { RestaurantTab } from './restaurantTab.view';

export const RestaurantTabContainer = () => {
  const [categoryNames, setCategoryNames] = useState([]);

  const handleName = (catName) => {
    const check = categoryNames.filter((catego) => {
      return catego.name === catName.name;
    });
    if (check.length === 0) {
      setCategoryNames([...categoryNames, catName]);
      return;
    }
    if (check.length > 0) {
      const newArray = categoryNames.filter((catego) => {
        return catego.name !== catName.name;
      });
      setCategoryNames(newArray);
    }
  };

  const deleteCategory = (cate) => {
    const newArray = categoryNames.filter((catego) => {
      return catego.name !== cate.name;
    });
    setCategoryNames(newArray);
  };

  return (
    <RestaurantTab
      categoryNames={categoryNames}
      handleName={handleName}
      deleteCategory={deleteCategory}
    />
  );
};
