import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';
import New from './New';
import Edit from './Edit';
import Form from './Form';
import Delete from './Delete';

const Routes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/keyboard" component={Index}/>

      {user && user.token ? (
        <>
          <Route exact path="/keyboard/new" component={New}/>
          <Route exact path="/keyboard/edit/:id" component={Edit}/>
          <Route exact path="/keyboard/form" component={Form}/>
          <Route exact path="/keyboard/delete" component={Delete}/>
        </>
      ) : null}
    </Switch>
  );
}
 
export default Routes;