import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import { oneOf } from 'prop-types'

const SIZE = {
  normal: 'normal',
  small: 'small',
}

const Paragraph = styled.p`
  font-size: ${ifProp({ size: SIZE.small }, '12px', '14px')};
  line-height: ${ifProp({ size: SIZE.small }, '20px', '22px')};
  font-weight: ${ifProp('bold', 700, 400)};
  margin-bottom: 24px;
  white-space: normal;
`

Paragraph.propTypes = {
  size: oneOf(Object.keys(SIZE)),
}

Paragraph.defaultProps = {
  size: SIZE.normal,
}

Paragraph.sizes = SIZE

export default Paragraph
