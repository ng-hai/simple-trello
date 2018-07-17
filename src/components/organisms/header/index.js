import React from 'react'
import { object } from 'prop-types'
import { prop } from 'styled-tools'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import AuthContext from '../../../context/auth'
import { Button, Heading } from '../../atoms'
import { Box } from '../../utilities'

const NavSection = Box.extend`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;
  gap: 4px;
`

const Container = styled.header`
  padding: 8px;
  width: 100%;
  background-color: ${prop('background', 'rgba(0, 0, 0, 0.15)')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Header = ({ history, ...props }) => {
  return (
    <Container {...props}>
      <Button
        icon='Trelloicon'
        iconText='Boards'
        onClick={() => history.push('/')}
      />

      <Heading variant='h5' style={{ color: 'white', userSelect: 'none' }}>
        Simple Trello
      </Heading>

      <NavSection>
        <AuthContext.Authorized>
          {({ signOut }) => <Button icon='Logout' onClick={signOut} />}
        </AuthContext.Authorized>
      </NavSection>
    </Container>
  )
}

Header.propTypes = {
  history: object.isRequired,
}

export default withRouter(Header)
