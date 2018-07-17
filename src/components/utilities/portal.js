import React from 'react'
import { func, bool } from 'prop-types'

import ReactPortal from './react-portal'

class Portal extends React.PureComponent {
  static propTypes = {
    children: func,
    closeOnEsc: bool,
    closeOnClickOutside: bool,
  }

  state = {
    open: false,
  }

  componentDidMount () {
    if (this.props.closeOnClickOutside) {
      document.addEventListener('click', this.handleClickOutside)
    }
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown)
    }
  }

  componentWillUnmount () {
    if (this.props.closeOnClickOutside) {
      document.removeEventListener('click', this.handleClickOutside)
    }
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown)
    }
  }

  handleKeydown = event => {
    if (this.props.closeOnEsc && event.keyCode === 27) {
      this.closePortal()
    }
  }

  handleClickOutside = event => {
    if (!this.state.open) {
      return
    }

    if (this.defaultNode.contains(event.target)) {
      return
    }

    this.closePortal()
  }

  createPortal = children => {
    if (this.state.open) {
      return <ReactPortal>{children}</ReactPortal>
    }

    return null
  }

  openPortal = event => {
    if (this.state.open) {
      return
    }

    if (event && event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation()
    }

    this.setState({ open: true })
  }

  closePortal = () => {
    if (!this.state.open) {
      return
    }

    this.setState({ open: false })
  }

  render () {
    return this.props.children({
      isOpen: this.state.open,
      openPortal: this.openPortal,
      closePortal: this.closePortal,
      createPortal: this.createPortal,
    })
  }
}

export default Portal
