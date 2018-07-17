import React from 'react'
import styled from 'styled-components'
import { func } from 'prop-types'

import { FormAddList, PlaceholderAddAction } from '../../molecules'

const Container = styled.div`
  border-radius: 3px;
  cursor: pointer;
  height: auto;
  min-height: 32px;
  padding: 4px;
  display: block;
  color: white;
  background: rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
  position: relative;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

class InitialList extends React.PureComponent {
  static propTypes = {
    onCreate: func,
  }

  state = {
    isOpen: false,
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (!this.state.isOpen) {
      return
    }

    if (this.container.contains(event.target)) {
      return
    }

    this.setFormState(false)()
  }

  setFormState = isOpen => () => {
    this.setState({ isOpen }, () => {
      if (isOpen) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    })
  }

  onSubmit = title => {
    const { onCreate } = this.props
    onCreate(title)
    this.setFormState(false)()
  }

  getContainerRef = node => {
    this.container = node
  }

  render () {
    return (
      <Container innerRef={this.getContainerRef}>
        <PlaceholderAddAction
          actionContent='Add another list'
          onClick={this.setFormState(true)}
        />
        {this.state.isOpen && (
          <FormAddList
            actionContent='Add List'
            onClose={this.setFormState(false)}
            onSubmit={this.onSubmit}
          />
        )}
      </Container>
    )
  }
}

export default InitialList
