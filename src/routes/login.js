import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import logo from '../assets/logo@128.png'
import AuthContext from '../context/auth'
import { Paragraph, Button, Box } from '../components'

export default class LoginPage extends React.PureComponent {
  static propTypes = {
    location: object.isRequired,
  }

  render () {
    const {
      location: { state },
    } = this.props

    const { from } = state || { from: { pathname: '/' } }

    return (
      <React.Fragment>
        <AuthContext.Authorized>
          <Redirect to={from} />
        </AuthContext.Authorized>
        <AuthContext.Unauthorized>
          {({ signIn, retriving }) => (
            <Container>
              <Card>
                <Logo />
                <Description>
                  Continue to organize and prioritize your projects in a fun,
                  flexible and rewarding way.
                </Description>
                <Button disabled={retriving} variant='DarkGrey' onClick={signIn} size='Small'>
                  {retriving ? 'Signing in...' : 'Sign in anonymously'}
                </Button>
              </Card>
            </Container>
          )}
        </AuthContext.Unauthorized>
      </React.Fragment>
    )
  }
}

const Container = Box.extend`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Card = Box.extend`
  max-width: 576px;
  width: 100%;
  overflow: hidden;
  border-radius: 2px;
  padding: 16px;
  text-align: center;
`

const Logo = styled.img.attrs({
  src: logo,
})`
  width: 120px;
  height: 120px;
`

const Description = Paragraph.extend`
  max-width: 50ch;
  margin-left: auto;
  margin-right: auto;
`

// const Container = Box.extend`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   overflow-y: auto;
//   overflow-x: hidden;
//   background: rgba(255, 255, 255, 0.65);
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 10;
// `

// const Dialog = Box.extend`
//   max-width: 768px;
//   width: 100%;
//   overflow: hidden;
//   margin: 48px auto 80px;
//   border-radius: 2px;
//   padding: 8px;
//   background: ${getPaletteColor('shades', 100)};
// `

// const DialogContent = Box.extend`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   margin: 16px auto;
// `
