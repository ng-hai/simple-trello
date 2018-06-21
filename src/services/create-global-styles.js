import { injectGlobal, css } from 'styled-components'

const globalStyles = css`
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
  }

  body {
    font-family: 'IBM Plex Sans', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }
`

injectGlobal`${globalStyles}`
