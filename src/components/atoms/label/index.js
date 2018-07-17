import styled from 'styled-components'

import getPaletteColor from '../../../services/getPaletteColor'

const Label = styled.label`
  font-size: 14px;
  color: ${getPaletteColor('shades', 600)};
`

export default Label
