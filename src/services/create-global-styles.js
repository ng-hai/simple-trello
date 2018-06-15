import { injectGlobal, css } from 'styled-components'

const globalStyles = css`
  body {
    font-family: sans-serif;

    .wf-active & {
      font-family: 'IBM Plex Sans', sans-serif;
    }
  }
`

export default function () {
  injectGlobal`${globalStyles}`
}
