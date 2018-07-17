import React from 'react'
import { object } from 'prop-types'
import styled, { withTheme } from 'styled-components'

import { Header, Heading } from '../components'
import getPaletteColor from '../services/getPaletteColor'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Body = styled.main`
  flex: 1;
  background-color: ${getPaletteColor('shades', 0)};
  overflow-y: auto;
  padding: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled(Heading)`
  color: ${getPaletteColor('shades', 400)};
  text-align: center;
  margin-bottom: 16px;
`

class NotFound extends React.PureComponent {
  static propTypes = {
    theme: object,
  }
  render () {
    const { theme } = this.props
    return (
      <Container>
        <Header background={theme.palette.blue[500]} />
        <Body>
          <Content variant='h2'>Page not found.</Content>
          <Content variant='h5'>
            This page may be private. If someone gave you this link, they may
            need to invite you to one of their boards or teams.
          </Content>
        </Body>
      </Container>
    )
  }
}

export default withTheme(NotFound)
