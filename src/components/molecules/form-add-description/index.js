import React from 'react'
import { func, string } from 'prop-types'
import styled, { css } from 'styled-components'

import getPaletteColor from '../../../services/getPaletteColor'
import { Textarea, Paragraph, Button } from '../../atoms'
import { Box } from '../../utilities'

const inputStyle = css`
  outline: none;
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 1px 6px rgba(0, 0, 0, 0.1);
  display: block;
  padding: 6px 8px;
  border: 1px solid ${getPaletteColor('shades', 300)};
  border-radius: 3px;
  min-height: 48px;
  line-height: 22px;
`

const Container = Box.extend`
  position: relative;
  margin-top: 8px;
`

const Form = styled.form``

const DescriptionInput = Textarea.extend`
  ${inputStyle};
  resize: none;
  &:focus,
  &:hover {
    border: 1px solid ${getPaletteColor('shades', 300)};
  }
`

const Action = Box.extend`
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

const ClickTarget = Box.extend`
  ${inputStyle};
  color: ${getPaletteColor('shades', 400)};
  cursor: pointer;
`

const Description = Box.extend`
  cursor: pointer;
  min-height: 48px;
`

class FormAddDescription extends React.PureComponent {
  static propTypes = {
    description: string,
    onSubmit: func,
  }

  static defaultProps = {
    description: '',
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.description !== prevState.value && !prevState.showForm) {
      return {
        value: nextProps.description,
      }
    }

    return null
  }

  state = {
    showForm: false,
    value: this.props.description,
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }

  onSubmit = event => {
    event.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(String(this.state.value).trim())
    }
    this.setFormState(false)()
  }

  setFormState = showForm => () => {
    this.setState({ showForm }, () => {
      if (showForm) {
        document.addEventListener('click', this.handleClickOutside)
        this.input.focus()
        this.input.select()
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    })
  }

  handleClickOutside = event => {
    if (!this.state.showForm) {
      return
    }

    if (this.container.contains(event.target)) {
      return
    }

    this.setFormState(false)()
  }

  onKeydown = event => {
    event.stopPropagation()
    if (event.which === 27) {
      this.setFormState(false)()
    }
  }

  onChange = event => {
    this.setState({ value: event.target.value }, this.resizeInput)
  }

  resizeInput = () => {
    this.input.style.height = 'auto'
    this.input.style.height = `${this.input.scrollHeight}px`
  }

  getContainerRef = node => {
    this.container = node
  }

  getInputRef = node => {
    this.input = node
  }

  render () {
    const { showForm, value } = this.state
    const { description } = this.props

    const placeholder = 'Add a more detailed description...'

    return (
      <Container innerRef={this.getContainerRef}>
        {!showForm &&
          !description && (
          <ClickTarget onClick={this.setFormState(true)}>
            <Paragraph style={{ margin: 0 }}>{placeholder}</Paragraph>
          </ClickTarget>
        )}
        {!showForm &&
          description && (
          <Description onClick={this.setFormState(true)}>
            {description.split('\n').map((paragraph, index) => (
              <Paragraph
                key={index}
                style={{ marginTop: 0, marginBottom: 4 }}
              >
                {paragraph}
              </Paragraph>
            ))}
          </Description>
        )}
        {showForm && (
          <Form onSubmit={this.onSubmit}>
            <DescriptionInput
              value={value}
              placeholder={placeholder}
              innerRef={this.getInputRef}
              onKeyDown={this.onKeydown}
              onChange={this.onChange}
              onFocus={this.resizeInput}
              onBlur={this.resizeInput}
            />
            <Action>
              <Button type='submit' variant='Green'>
                Save
              </Button>
              <ButtonClose
                type='button'
                icon='Close'
                onClick={this.setFormState(false)}
              />
            </Action>
          </Form>
        )}
      </Container>
    )
  }
}

export default FormAddDescription
