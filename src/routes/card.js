import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import getPaletteColor from '../services/getPaletteColor'
import { getCard, getList, updateList, updateCard } from '../firebase/boards'
import {
  Backdrop,
  Box,
  Icon,
  Button,
  Heading,
  Textarea,
  FormAddDescription,
} from '../components'

const Container = styled.div`
  max-width: 728px;
  width: 100%;
  min-width: 300px;
  margin: 48px 0 80px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  background: ${getPaletteColor('shades', 100)};
  z-index: 25;
  padding: 8px 16px 16px 8px;
`

const Section = Box.extend`
  display: grid;
  grid-template-areas: 'icon content';
  grid-template-columns: 32px 1fr;
  grid-gap: 8px;
  gap: 8px;
  margin-bottom: 8px;
`

const IconBox = Box.extend`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getPaletteColor('shades', 400)};
  grid-area: icon;
`

const ContentBox = Box.extend`
  display: flex;
  flex-direction: column;
`

const ContentTitle = Box.extend``

const TitleInput = Textarea.extend`
  background: transparent;
  min-height: 24px;
  height: 26px;
  resize: none;
  border: 1px solid transparent;
  box-shadow: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  overflow: hidden;
  word-wrap: break-word;
  padding: 0;
  margin-top: 2px;

  &:focus {
    background: rgba(255, 255, 255, 0.85);
  }
`

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  color: ${getPaletteColor('shades', 400)};
  background: none;
  &:hover,
  &:focus {
    background: none;
    color: ${getPaletteColor('shades', 500)};
  }
`

class Card extends React.PureComponent {
  static propTypes = {
    match: object,
    history: object,
  }

  state = {
    card: {},
    list: {},
    title: '',
  }

  componentDidMount () {
    const {
      match: { params },
      history,
    } = this.props

    history.location.state = ''

    const [, listId, cardId] = params.id
      ? window.atob(params.id).split(':')
      : [null, null, null]

    if (!listId || !cardId) {
      this.setState({ card: null })
      return
    }

    this.unsubcribeCard = getCard({
      listId,
      cardId,
      onCardChange: card =>
        this.setState({ card, title: card ? card.title : '' }),
    })

    this.unsubcribeList = getList(listId, list => this.setState({ list }))

    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount () {
    if (typeof this.unsubcribeCard === 'function') {
      this.unsubcribeCard()
    }
    if (typeof this.unsubcribeList === 'function') {
      this.unsubcribeList()
    }
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = event => {
    const { card } = this.state
    const { history } = this.props
    if (event.which === 27 && event.target.nodeName === 'BODY') {
      history.push(`/b/${card.boardId}`)
    }
  }

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.onCloseCard()
    }
  }

  onCloseCard = () => {
    const { card } = this.state
    const { history } = this.props
    history.push(`/b/${card.boardId}`)
  }

  onDeleteCard = () => {
    const { card, list } = this.state
    const mutatedList = { ...list }
    Object.values(mutatedList.cards)
      .filter(({ id }) => card.id !== id)
      .map(item => {
        if (item.index > card.index) {
          mutatedList.cards[item.id].index -= 1
        }
      })

    delete mutatedList.cards[card.id]

    updateList({
      [mutatedList.id]: mutatedList,
    })
  }

  onSubmitDescription = description => {
    updateCard({ ...this.state.card, description })
  }

  getInputRef = node => {
    this.input = node
  }

  resizeInput = () => {
    this.input.style.height = 'auto'
    this.input.style.height = `${this.input.scrollHeight}px`
    this.input.style.height = `${
      this.input.scrollHeight <= 46 ? 26 : this.input.scrollHeight
    }px`
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value }, this.resizeInput)
  }

  onBlur = () => {
    this.resizeInput()
    const title = String(this.state.title).trim()
    if (title) {
      updateCard({ ...this.state.card, title })
    }
  }

  onKeyDown = event => {
    if (event.which === 13 || event.which === 27) {
      this.input.blur()
    }
  }

  render () {
    const { card, title } = this.state

    if (!card) {
      return <Redirect to='/' />
    }

    return (
      <Backdrop onClick={this.onBackdropClick}>
        {card.id && (
          <Container>
            <ButtonClose icon='Close' onClick={this.onCloseCard} />
            <Section>
              <IconBox>
                <Icon name='Card' />
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <TitleInput
                    value={title}
                    innerRef={this.getInputRef}
                    onChange={this.onChangeTitle}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                  />
                </ContentTitle>
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Description' />
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    Description
                  </Heading>
                </ContentTitle>
                <FormAddDescription
                  description={card.description}
                  onSubmit={this.onSubmitDescription}
                />
              </ContentBox>
            </Section>
            <Section>
              <IconBox>
                <Icon name='Collections' />
              </IconBox>
              <ContentBox>
                <ContentTitle>
                  <Heading variant='h6' style={{ marginTop: 6 }}>
                    Action
                  </Heading>
                </ContentTitle>
                <Box mt='8px'>
                  <Button icon='Archive' onClick={this.onDeleteCard}>
                    Archive
                  </Button>
                </Box>
              </ContentBox>
            </Section>
          </Container>
        )}
      </Backdrop>
    )
  }
}

export default Card
