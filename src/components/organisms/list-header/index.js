import React from 'react'
import styled from 'styled-components'
import { string, func, object } from 'prop-types'

import getPaletteColor from '../../../services/getPaletteColor'
import { Textarea, Button } from '../../atoms'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  flex: 0 0 auto;
  padding: 12px 68px 10px 8px;
  min-height: 22px;
  position: relative;
`

const ClickTarget = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`

const TitleInput = Textarea.extend`
  background: transparent;
  max-height: 256px;
  min-height: 20px;
  height: 26px;
  resize: none;
  border: 1px solid transparent;
  box-shadow: none;
  font-weight: 700;
  overflow: hidden;
  word-wrap: break-word;
  margin-top: -4px;
  padding: 4px 7px;
  &:focus {
    background: rgba(255, 255, 255, 0.85);
  }
`

const ButtonRemove = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
  background: transparent;
  color: ${getPaletteColor('shades', 400)};
`

class ListHeader extends React.PureComponent {
  static propTypes = {
    title: string.isRequired,
    onUpdateTitle: func,
    onRemove: func,
    dragHandleProps: object,
  }

  static getDerivedStateFromProps (props, state) {
    if (props.title === state.prevTitle) {
      return null
    }

    return {
      title: props.title,
      prevTitle: props.title,
    }
  }

  state = {
    title: this.props.title,
    prevTitle: this.props.title,
    showTarget: true,
  }

  input = null

  getInputRef = node => {
    this.input = node
    this.resizeInput()
  }

  onTargetClick = event => {
    if (event.target === event.currentTarget) {
      this.input.focus()
      this.input.select()
    }

    this.setState({ showTarget: false })
  }

  handleKeydown = event => {
    if (event.which === 13 || event.which === 27) {
      this.input.blur()
    }
  }

  onBlur = () => {
    if (this.state.title) {
      this.props.onUpdateTitle(this.state.title)
    } else {
      this.setState({ title: this.props.title })
    }
    this.setState({ showTarget: true }, this.resizeInput)
  }

  onChange = event => {
    this.setState({ title: event.target.value }, this.resizeInput)
  }

  resizeInput = () => {
    if (this.input) {
      this.input.style.height = 'auto'
      this.input.style.height = `${this.input.scrollHeight}px`
      this.input.style.height = `${
        this.input.scrollHeight < 40 ? 26 : this.input.scrollHeight
      }px`
    }
  }

  render () {
    const { title, showTarget } = this.state
    const { onRemove, dragHandleProps } = this.props
    return (
      <Container {...dragHandleProps}>
        {showTarget && <ClickTarget onClick={this.onTargetClick} />}
        <TitleInput
          spellCheck={false}
          autoCorrect={'false'}
          maxLength={512}
          innerRef={this.getInputRef}
          value={title}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyDown={this.handleKeydown}
        />
        <ButtonRemove icon='Remove' onClick={onRemove} />
      </Container>
    )
  }
}

export default ListHeader
