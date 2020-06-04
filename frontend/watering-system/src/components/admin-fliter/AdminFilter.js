import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import AdminPage from '../admin-page/AdminPage';
import DeleteUser from '../admin-page/DeleteUser';

export default function AdminFilter() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/add`}>
          <AdminPage></AdminPage>
        </Route>

        <Route path={`${match.url}`}>
          <DeleteUser></DeleteUser>
        </Route>
      </Switch>
    </div>
  );

}
