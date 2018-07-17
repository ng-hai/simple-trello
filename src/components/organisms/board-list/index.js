import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import {
  getBoardList,
  updateList,
  createList,
  createCard,
  deleteList,
} from '../../../firebase/boards'
import List from '../list'
import InitialList from '../initial-list'

const BoardCanvas = styled.div`
  flex: 1;
  position: relative;
`

const BoardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
`

const Column = styled.div`
  width: 272px;
  height: 100%;
  margin: 0 4px;
  display: inline-block;
  vertical-align: top;
  &:first-child {
    margin-left: 8px;
  }
  &:last-child {
    margin-right: 8px;
  }
`

class BoardList extends React.PureComponent {
  static propTypes = {
    match: object,
  }

  state = {
    list: {},
    sortedList: [],
    currentIndex: 0,
  }

  componentDidMount () {
    const {
      match: { params },
    } = this.props

    let boardId = params.boardId

    if (params.id) {
      const [id] = window.atob(params.id).split(':')
      boardId = id
    }

    if (!boardId) {
      this.setState({ list: null })
      return
    }

    this.unsubcribe = getBoardList(boardId, list => {
      const sortedList = Object.values(list).sort((a, b) => a.index > b.index)

      this.setState({
        list,
        sortedList,
        currentIndex:
          sortedList.length > 0 ? sortedList[sortedList.length - 1].index : 0,
      })
    })
  }

  componentWillUnmount () {
    if (typeof this.unsubcribe === 'function') {
      this.unsubcribe()
    }
  }

  onDragEnd = result => {
    const { destination, source, type, draggableId } = result

    if (!destination) {
      return
    }

    const destinationIndex = destination.index
    const sourceIndex = source.index

    const { list, sortedList } = this.state
    const mutatedList = { ...list }

    if (type === 'LIST') {
      const moveToRight = destinationIndex > sourceIndex
      const moveToLeft = destinationIndex < sourceIndex
      const notMove = destinationIndex === sourceIndex

      if (notMove) {
        return
      }

      sortedList.map(item => {
        const itemIndex = item.index

        if (item.index === sourceIndex) {
          mutatedList[item.id].index = destinationIndex
        }

        if (
          moveToRight &&
          itemIndex <= destinationIndex &&
          itemIndex > sourceIndex
        ) {
          mutatedList[item.id].index -= 1
        }

        if (
          moveToLeft &&
          itemIndex >= destinationIndex &&
          itemIndex < sourceIndex
        ) {
          mutatedList[item.id].index += 1
        }
      })

      updateList(mutatedList)
    }

    if (type === 'CARD') {
      const destinationDroppableId = destination.droppableId
      const sourceDroppableId = source.droppableId
      const sourceList = mutatedList[sourceDroppableId]
      const destinationList = mutatedList[destinationDroppableId]

      if (destinationDroppableId === sourceDroppableId) {
        // Same list
        const moveTop = destinationIndex < sourceIndex
        const moveDown = destinationIndex > sourceIndex
        const notMove = destinationIndex === sourceIndex

        if (notMove) {
          return
        }

        Object.values(sourceList.cards).map(card => {
          const cardIndex = card.index
          const cardId = card.id
          if (cardIndex === sourceIndex) {
            sourceList.cards[cardId].index = destinationIndex
          }

          if (
            moveDown &&
            cardIndex <= destinationIndex &&
            cardIndex > sourceIndex
          ) {
            sourceList.cards[cardId].index -= 1
          }

          if (
            moveTop &&
            cardIndex >= destinationIndex &&
            cardIndex < sourceIndex
          ) {
            sourceList.cards[cardId].index += 1
          }
        })
      } else {
        // Different list

        // Reorder sourceList.cards
        Object.values(sourceList.cards).map(card => {
          if (card.index > sourceIndex) {
            sourceList.cards[card.id].index -= 1
          }
        })

        const finalDestinationIndex = destinationIndex + 1

        // Add card to destinationList.cards
        destinationList.cards = {
          ...destinationList.cards,
          [draggableId]: {
            ...sourceList.cards[draggableId],
            index: finalDestinationIndex,
            listId: destinationDroppableId,
          },
        }

        // Reorder destinationList.cards
        Object.values(destinationList.cards)
          .filter(({ id }) => id !== draggableId)
          .map(card => {
            if (card.index >= finalDestinationIndex) {
              destinationList.cards[card.id].index += 1
            }
          })

        // Delete card from sourceList.cards
        delete sourceList.cards[draggableId]
      }

      updateList(mutatedList)
    }
  }

  onCreateList = title => {
    const {
      match: { params },
    } = this.props
    createList({
      title,
      boardId: params.boardId,
      index: this.state.currentIndex + 1,
    })
  }

  onCreateCard = (listId, boardId) => ({ index, title }) => {
    createCard({ listId, boardId, index, title })
  }

  onRemoveList = listId => () => {
    deleteList({ listId })
  }

  onUpdateList = list => title => {
    updateList({ [list.id]: { ...list, title } })
  }

  render () {
    const { sortedList, list } = this.state
    if (!list) {
      return null
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <BoardCanvas>
          <Droppable droppableId='board' type='LIST' direction='horizontal'>
            {provided => (
              <BoardContent
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {sortedList.map(list => (
                  <Column key={list.id}>
                    <List
                      list={list}
                      onCreateCard={this.onCreateCard(list.id, list.boardId)}
                      onRemoveList={this.onRemoveList(list.id)}
                      onUpdateListTitle={this.onUpdateList(list)}
                    />
                  </Column>
                ))}
                {provided.placeholder}
                <Column>
                  <InitialList onCreate={this.onCreateList} />
                </Column>
              </BoardContent>
            )}
          </Droppable>
        </BoardCanvas>
      </DragDropContext>
    )
  }
}

export default withRouter(BoardList)
