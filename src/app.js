import React from 'react'
import { Switch, Route } from 'react-router-dom'

import 'sanitize.css/sanitize.css'
import './services/create-global-styles'

import { PrivateRoute, HomePage, LoginPage } from './components'

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={HomePage} />
      <PrivateRoute path='/about' component={() => <h1>about</h1>} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  )
}

export default App
