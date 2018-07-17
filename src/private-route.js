import React from 'react'
import { any } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from './context/auth'

/**
 * https://reacttraining.com/react-router/web/example/auth-workflow
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={routeComponentProps => (
      <React.Fragment>
        <AuthContext.Authorized>
          <Component {...routeComponentProps} />
        </AuthContext.Authorized>
        <AuthContext.Unauthorized>
          {({ isDeleted }) => (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: isDeleted ? '/' : routeComponentProps.location },
              }}
            />
          )}
        </AuthContext.Unauthorized>
      </React.Fragment>
    )}
  />
)

PrivateRoute.propTypes = {
  component: any.isRequired,
}

export default PrivateRoute
