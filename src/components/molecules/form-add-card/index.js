import React from 'react'
import { func } from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

import getPaletteColor from '../../../services/getPaletteColor'
import { Button, Paper, Textarea } from '../../atoms'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
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

const PaperInput = Paper.extend`
  margin-bottom: 4px;
  height: auto;
`

const TitleInput = Textarea.extend`
  border: none;
  background: transparent;
  box-shadow: none;
  resize: none;
  max-height: 162px;
  min-height: 54px;
  word-wrap: break-word;
  padding: 0;
  &:hover,
  &:focus {
    border: none;
    background: transparent;
    box-shadow: none;
  }
`

class FormAddCard extends React.PureComponent {
  static propTypes = {
    onSubmit: func,
    onClose: func,
  }

  state = {
    title: '',
  }

  componentDidMount () {
    this.setState(
      { title: window.sessionStorage.getItem('title') || '' },
      () => {}
    )
    this.input.focus()
  }

  onChange = event => {
    const title = event.target.value
    this.setState(
      { title },
      debounce(
        () => {
          window.sessionStorage.setItem('title', title)
        },
        50,
        { leading: false, trailing: true }
      )
    )
    this.resizeInput()
  }

  onClose = () => {
    this.clearValue()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  handleKeydown = event => {
    if (event.which === 27 && this.props.onClose) {
      this.onClose()
    }

    if (event.which === 13) {
      event.preventDefault()
      if (this.props.onSubmit && Boolean(this.state.title)) {
        this.props.onSubmit(this.state.title)
        this.clearValue()
      }
    }
  }

  getInputRef = node => {
    this.input = node
  }

  resizeInput = () => {
    this.input.style.height = 'auto'
    this.input.style.height = `${this.input.scrollHeight}px`
  }

  clearValue = () => {
    window.sessionStorage.removeItem('title')
    this.setState({ title: '' }, () => {
      this.input.scrollIntoView()
    })
  }

  onSubmit = event => {
    event.preventDefault()
    if (this.props.onSubmit && Boolean(this.state.title)) {
      this.props.onSubmit(this.state.title)
      this.clearValue()
    }
  }

  onFocus = () => {
    this.input.scrollIntoView()
  }

  render () {
    const { onClose, ...props } = this.props
    return (
      <Form {...props} onSubmit={this.onSubmit}>
        <PaperInput>
          <TitleInput
            innerRef={this.getInputRef}
            placeholder='Enter a title for this card...'
            value={this.state.title}
            onChange={this.onChange}
            onBlur={this.resizeInput}
            onKeyDown={this.handleKeydown}
            onFocus={this.onFocus}
          />
        </PaperInput>
        <Action>
          <Button type='submit' variant='Green'>
            Add Card
          </Button>
          <ButtonClose type='button' icon='Close' onClick={this.onClose} />
        </Action>
      </Form>
    )
  }
}

export default FormAddCard
