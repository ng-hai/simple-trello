import { injectGlobal, css } from 'styled-components'

const globalStyles = css`
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
    text-rendering: optimizeLegibility;
  }

  ::-webkit-scrollbar-track-piece {
    background: transparent;
    border-radius: 4px;
    border: none;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }

  ::-webkit-scrollbar-button {
    display: block;
    height: 4px;
    width: 4px;
  }

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    /* border-radius: 4px; */
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`

injectGlobal`${globalStyles}`
