/* eslint-disable */

import { RESTAURANT_VIEW_PAGE } from "./router/router";

<Router>
      <Switch>
        <Route path='/loginPage'>
            <LoginPage />
        </Route>
        <PrivateRoute path={RESTAURANT_LIST_PAGE}>
            <RestaurantListPage />
        </PrivateRoute>
        <PrivateRoute path={`${RESTAURANT_VIEW_PAGE}/:id`}>
            <RestaurantViewPage />
        </PrivateRoute>
        <PrivateRoute path={`/${BACKOFFICE_PAGE}/:id`}>
            <BackOfficePage />
        </PrivateRoute>
        <Route path='/'>
            <Redirect to='loginPage' />
        </Route>
      </Switch>
    </Router>