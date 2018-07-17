import React, { createContext } from 'react'

import Firebase from '../firebase'
import { createUser, deleteUser } from '../firebase/users'

const initialState = {
  authenticated: false,
  isDeleted: false,
  retriving: true,
  signIn: () => {},
  signOut: () => {},
}

const { Provider, Consumer } = createContext(initialState)

class AuthContext extends React.PureComponent {
  static Authorized = ({ children }) => (
    <Consumer>
      {({ signIn, ...rest }) => {
        if (!rest.authenticated) {
          return null
        }

        return typeof children === 'function' ? children(rest) : children
      }}
    </Consumer>
  )

  static Unauthorized = ({ children }) => (
    <Consumer>
      {({ signOut, ...rest }) => {
        if (rest.authenticated) {
          return null
        }

        return typeof children === 'function' ? children(rest) : children
      }}
    </Consumer>
  )

  componentDidMount () {
    Firebase.auth.onAuthStateChanged(user => {
      this.setState({
        authenticated: Boolean(user),
        retriving: false,
        isDeleted: false,
      })
    })
  }

  signIn = () => {
    this.setState({ retriving: true }, () => {
      Firebase.auth.signInAnonymously().then(createUser)
    })
  }

  signOut = () => {
    this.setState({ authenticated: false, isDeleted: true }, deleteUser)
  }

  state = {
    ...initialState,
    signIn: this.signIn,
    signOut: this.signOut,
  }

  render () {
    return <Provider value={this.state} {...this.props} />
  }
}

export default AuthContext
