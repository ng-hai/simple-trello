import React from 'react'
import { ifProp } from 'styled-tools'
import styled, { css } from 'styled-components'
import { object, func } from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import getPaletteColor from '../../../services/getPaletteColor'
import ListHeader from '../list-header'
import ListFooter from '../list-footer'
import ListCards from '../list-cards'

const Container = styled.div`
  border-radius: 3px;
  background: ${getPaletteColor('shades', 200)};
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${ifProp(
    'isDragging',
    css`
      border: 1px solid ${getPaletteColor('shades', 300)};
      border-bottom-color: ${getPaletteColor('shades', 300)};
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    `
  )};
`

class List extends React.PureComponent {
  static propTypes = {
    list: object.isRequired,
    onRemoveList: func,
    onCreateCard: func,
    onUpdateListTitle: func,
  }

  static getDerivedStateFromProps ({ list: { cards } }) {
    const sortedCards = cards
      ? Object.values(cards).sort((a, b) => a.index > b.index)
      : []
    return {
      sortedCards,
      currentIndex:
        sortedCards.length > 0 ? sortedCards[sortedCards.length - 1].index : 0,
    }
  }

  state = {
    open: false,
    currentIndex: 0,
    sortedCards: [],
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }

  setFormState = open => () => {
    this.setState({ open }, () => {
      if (open) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    })
  }

  handleClickOutside = event => {
    if (!this.state.open) {
      return
    }

    if (this.form.contains(event.target)) {
      return
    }

    this.setFormState(false)()
  }

  onAddCard = title => {
    const { onCreateCard } = this.props
    const { currentIndex } = this.state

    onCreateCard({
      title,
      index: currentIndex + 1,
    })
  }

  getFormRef = node => {
    this.form = node
  }

  render () {
    const {
      list: { title, id, index },
      onRemoveList,
      onUpdateListTitle,
    } = this.props

    const { open, sortedCards } = this.state

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Container
            isDragging={snapshot.isDragging}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
          >
            <ListHeader
              title={title}
              onUpdateTitle={onUpdateListTitle}
              onRemove={onRemoveList}
              dragHandleProps={provided.dragHandleProps}
            />
            <ListCards
              listId={id}
              cards={sortedCards}
              listType='CARD'
              isFormShow={open}
              onAddCard={this.onAddCard}
              getFormRef={this.getFormRef}
              onCloseForm={this.setFormState(false)}
            />
            {!open && <ListFooter onClick={this.setFormState(true)} />}
          </Container>
        )}
      </Draggable>
    )
  }
}

export default List
