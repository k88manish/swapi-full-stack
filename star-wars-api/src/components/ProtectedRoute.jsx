import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {auth} from '../utils';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      auth.isAuthenticated === true
        ? <Component planet={[...rest.planets]} {...props} />
        : <Redirect to='/login' />
    )} />
  )