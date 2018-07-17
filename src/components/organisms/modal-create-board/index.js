import React from 'react'
import { prop } from 'styled-tools'
import { object, func } from 'prop-types'
import styled, { withTheme } from 'styled-components'

import { Button, Icon, Input, Backdrop } from '../../atoms'

const InputTitle = Input.extend`
  color: white;
  font-weight: 700;
  background: transparent;
  border: none;
  transition: background 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`

const Form = styled.form`
  display: grid;
  grid-auto-flow: row;
  gap: 8px;
  grid-gap: 8px;
  width: 300px;
  margin: 56px auto;
`

const BoardBox = styled.div`
  border-radius: 3px;
  height: 100px;
  transition: background 0.3s ease;
  background: ${prop('background')};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ColorsBox = styled.div`
  display: grid;
  grid-gap: 10px;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(32px, 1fr));
  grid-auto-rows: 32px;
`

const Color = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: white;
  transition: background 0.3s ease;
  cursor: pointer;
  background: ${prop('background')};

  &:hover {
    background: ${prop('hoverColor')};
  }
`

class ModalCreateBoard extends React.PureComponent {
  static propTypes = {
    theme: object.isRequired,
    onDismiss: func,
    onSubmit: func,
  }

  state = {
    boardColor: this.props.theme.palette.blue[500],
    title: '',
  }

  onChangeColor = color => () => {
    this.setState({ boardColor: color })
  }

  onBackdropClick = event => {
    if (event.currentTarget === event.target && this.props.onDismiss) {
      this.props.onDismiss()
    }
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    const { title, boardColor } = this.state
    if (title) {
      this.props.onSubmit({ name: title, background: boardColor })
    }
  }

  renderColor = ([name, value]) => {
    const bgColor = value[500]
    const hoverColor = value[600]
    return (
      <Color
        key={name}
        background={bgColor}
        hoverColor={hoverColor}
        onClick={this.onChangeColor(bgColor)}
      >
        {this.state.boardColor === bgColor && <Icon name='Check' />}
      </Color>
    )
  }

  render () {
    const { theme } = this.props
    return (
      <Backdrop onClick={this.onBackdropClick}>
        <Form onSubmit={this.onSubmit}>
          <BoardBox background={this.state.boardColor}>
            <InputTitle
              placeholder='Add board title'
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </BoardBox>
          <ColorsBox>
            {Object.entries(theme.palette).map(this.renderColor)}
          </ColorsBox>
          <Button
            disabled={!this.state.title}
            style={{ justifySelf: 'start' }}
            variant='Green'
          >
            Create Board
          </Button>
        </Form>
      </Backdrop>
    )
  }
}

export default withTheme(ModalCreateBoard)
