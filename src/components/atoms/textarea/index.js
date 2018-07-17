import styled from 'styled-components'

import getPaletteColor from '../../../services/getPaletteColor'

const Textarea = styled.textarea`
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  padding: 6px 8px;
  display: block;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${getPaletteColor('blue', 400)};
    box-shadow: 0 0 2px 0 ${getPaletteColor('blue', 600)};
  }
`

export default Textarea
