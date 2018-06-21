import React from 'react'
import { any } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import fakeAuth from '../services/fake-auth'

/**
 * https://reacttraining.com/react-router/web/example/auth-workflow
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={routeComponentProps =>
      fakeAuth.isAuthenticated ? (
        <Component {...routeComponentProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: routeComponentProps.location },
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: any.isRequired,
}

export default PrivateRoute
