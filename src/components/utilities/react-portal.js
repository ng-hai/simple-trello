import React from 'react'
import { node } from 'prop-types'
import { createPortal } from 'react-dom'

class ReactPortal extends React.PureComponent {
  static propTypes = {
    children: node,
  }

  defaultNode = document.createElement('div')

  componentDidMount () {
    document.body.appendChild(this.defaultNode)
  }

  componentWillUnmount () {
    document.body.removeChild(this.defaultNode)
  }

  render () {
    return createPortal(this.props.children, this.defaultNode)
  }
}

export default ReactPortal
