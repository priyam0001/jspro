import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';
import New from './New';
import Edit from './Edit';

const Routes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/mouse" component={Index}/>

      {user && user.token ? (
        <>
          <Route exact path="/mouse/new" component={New}/>
          <Route exact path="/mouse/edit/:id" component={Edit}/>
        </>
      ) : null}
    </Switch>
  );
}
 
export default Routes;