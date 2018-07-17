import React from 'react'
import styled from 'styled-components'
import { object } from 'prop-types'
import { prop } from 'styled-tools'
import { Redirect } from 'react-router-dom'

import { Header, BoardHeader, BoardList } from '../components'
import { getBoard, deleteBoard } from '../firebase/boards'
// import getPaletteColor from '../services/getPaletteColor'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: ${prop('background')};
`

const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

// const Card = styled.div`
//   height: 56px;
//   border-radius: 3px;
//   background: ${getPaletteColor('shades', 0)};
//   box-shadow: 0 1px 0 ${getPaletteColor('shades', 300)};
//   cursor: pointer;
//   margin-bottom: 8px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// `

class Board extends React.PureComponent {
  static propTypes = {
    match: object.isRequired,
  }

  state = {
    board: {},
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
      this.setState({ board: null })
      return
    }

    this.unsubcribe = getBoard(boardId, board =>
      this.setState({ board }, () => {
        document.body.style.background = board ? board.background : 'none'
      })
    )
  }

  componentWillUnmount () {
    document.body.style.background = 'none'
    if (typeof this.unsubcribe === 'function') {
      this.unsubcribe()
    }
  }

  onLeaveBoard = () => {
    deleteBoard(this.state.board.id)
  }

  render () {
    const { board } = this.state

    if (!board) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    return (
      <Container>
        <Header />
        <Body>
          <BoardHeader boardName={board.name} onLeaveBoard={this.onLeaveBoard} />
          <BoardList board={board} />
        </Body>
      </Container>
    )
  }
}

export default Board
