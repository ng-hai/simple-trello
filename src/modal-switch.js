import React from 'react'
import { object } from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { LoginPage, HomePage, Board, NotFound, Card } from './routes'
import PrivateRoute from './private-route'

class ModalSwitch extends React.PureComponent {
  static propTypes = {
    location: object.isRequired,
    history: object.isRequired,
  }

  previousLocation = this.props.location

  render () {
    const { location, history } = this.props

    const isNotModal = !location.state || !location.state.modal

    if (
      history.action !== 'POP' &&
      history.action !== 'REPLACE' &&
      isNotModal
    ) {
      this.previousLocation = location
    }

    // Not initial render
    const isModal = Boolean(
      location.state &&
        location.state.modal &&
        this.previousLocation !== location
    )

    return (
      <React.Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/b/:boardId' component={Board} />
          <PrivateRoute exact path='/c/:id' component={Board} />
          <Route path='/login' component={LoginPage} />
          <Route path='*' component={NotFound} />
        </Switch>
        <PrivateRoute exact path='/c/:id' component={Card} />
      </React.Fragment>
    )
  }
}

export default ModalSwitch
