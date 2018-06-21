import React from 'react'
import { object } from 'prop-types'
import { Redirect } from 'react-router-dom'

import fakeAuth from '../../services/fake-auth'

class LoginPage extends React.PureComponent {
  static propTypes = {
    location: object.isRequired,
  }

  state = {
    redirectToReferrer: false,
  }

  login = () => {
    fakeAuth.authenticate(() => this.setState({ redirectToReferrer: true }))
  }

  render () {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      const {
        location: { state },
      } = this.props

      const { from } = state || { from: { pathname: '/' } }

      return <Redirect to={from} />
    }
    return (
      <div>
        <h1>LoginPage</h1>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default LoginPage
