import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Route } from 'react-router-dom'

import 'sanitize.css/sanitize.css'
import './services/globalStyles'

import theme from './theme'
import ModalSwitch from './modal-switch'
import AuthContext from './context/auth'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <Route component={ModalSwitch} />
      </AuthContext>
    </ThemeProvider>
  )
}

export default App
