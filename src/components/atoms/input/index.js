import styled from 'styled-components'
import { ifProp } from 'styled-tools'

import getPaletteColor from '../../../services/getPaletteColor'

const Input = styled.input`
  border-radius: 3px;
  padding: 8px 8px;
  outline: none;
  height: ${ifProp('small', '32px', '48px')};
  font-size: ${ifProp('small', '14px', '16px')};
  color: ${getPaletteColor('shades', 600)};
  border: 1px solid ${getPaletteColor('shades', 300)};

  &::placeholder {
    color: ${getPaletteColor('shades', 400)};
  }

  &:focus {
    border-color: ${getPaletteColor('blue', 400)};
  }
`

export default Input
