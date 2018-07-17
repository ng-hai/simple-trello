import React from 'react'
import styled from 'styled-components'
import { string, func, node } from 'prop-types'

import getPaletteColor from '../../../services/getPaletteColor'
import { Button, Input } from '../../atoms'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: ${getPaletteColor('shades', 200)};
  height: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  border-radius: 3px;
  transition: height 0.3s ease;
`

const Action = styled.div`
  margin-top: 4px;
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  grid-gap: 4px;
  justify-items: start;
  justify-content: start;
  align-items: center;
`

const ButtonClose = styled(Button)`
  color: ${getPaletteColor('shades', 400)};
  background: transparent;
`

class FormAddInline extends React.PureComponent {
  static propTypes = {
    children: node,
    actionContent: string,
    onSubmit: func,
    onClose: func,
  }

  state = {
    title: '',
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    const { title } = this.state
    if (this.props.onSubmit && Boolean(title)) {
      this.props.onSubmit(title)
    }
  }

  render () {
    const { children, actionContent, onClose, ...props } = this.props
    return (
      <Form {...props} onSubmit={this.onSubmit}>
        <Input
          small
          autoFocus
          placeholder='Enter list title...'
          style={{ fontWeight: 700 }}
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
        <Action>
          <Button type='submit' variant='Green'>
            {actionContent}
          </Button>
          <ButtonClose type='button' icon='Close' onClick={onClose} />
        </Action>
      </Form>
    )
  }
}

export default FormAddInline
