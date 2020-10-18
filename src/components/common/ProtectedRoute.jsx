import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      render={props => {
        if (!auth.getAuthUser()) return <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />;
        return Component ? <Component {...props} /> : render(props);
      }}
      {...rest}
    />
  );
}

export default ProtectedRoute;
