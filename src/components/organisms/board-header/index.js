import React from 'react'
import styled from 'styled-components'
import { string, func } from 'prop-types'

import { Button } from '../../atoms'

const Container = styled.div`
  height: 48px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BoardHeader = ({ boardName, onLeaveBoard }) => {
  return (
    <Container>
      <Button size='Small' iconText={boardName} />
      <Button icon='Close' iconText='Delete Board' onClick={onLeaveBoard} />
    </Container>
  )
}

BoardHeader.propTypes = {
  boardName: string,
  onLeaveBoard: func,
}

export default BoardHeader
