import React from 'react'
import styled from 'styled-components'
import { array, func } from 'prop-types'

import getPaletteColor from '../../../services/getPaletteColor'
import ModalCreateBoard from '../modal-create-board'
import { Heading, Icon } from '../../atoms'
import { BoardItem } from '../../molecules'
import { Portal } from '../../utilities'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 150px;
  grid-gap: 16px;
  gap: 16px;
  margin: 16px 0;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  background: ${getPaletteColor('shades', 100)};
  &:hover {
    background: ${getPaletteColor('shades', 300)};
  }
`

const Category = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`

const BoardGrid = ({ boards, onSubmit }) => {
  return (
    <Portal closeOnEsc>
      {({ openPortal, closePortal, createPortal }) => (
        <React.Fragment>
          <Category>
            <Icon name='Trellian' />
            <Heading variant='h5'>Personal Boards</Heading>
          </Category>
          <Container>
            {boards.map(board => <BoardItem key={board.id} {...board} />)}

            <Placeholder onClick={openPortal}>
              <Heading variant='h6' style={{ textAlign: 'center' }}>
                Create new board...
              </Heading>
            </Placeholder>
          </Container>
          {createPortal(
            <ModalCreateBoard
              onDismiss={closePortal}
              onSubmit={onSubmit(closePortal)}
            />
          )}
        </React.Fragment>
      )}
    </Portal>
  )
}

BoardGrid.propTypes = {
  boards: array.isRequired,
  onSubmit: func,
}

export default BoardGrid
