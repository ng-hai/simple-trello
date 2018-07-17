import React from 'react'
import styled from 'styled-components'

import { PlaceholderAddAction } from '../../molecules'

const Container = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`

const ListFooter = props => {
  return (
    <Container {...props}>
      <PlaceholderAddAction actionContent='Add another card' />
    </Container>
  )
}

export default ListFooter
