import React from 'react'
import styled from 'styled-components'
import { oneOf } from 'prop-types'

import { BLACK } from '../../theme'

const Level = {
  h1: styled.h1`
    font-size: 22px;
    line-height: 1.2em;
    margin: 0 0 10px;
    color: ${BLACK};
  `,
  h2: styled.h2`
    font-size: 18px;
    line-height: 1.2em;
    margin: 0 0 9px;
    color: ${BLACK};
  `,
  h3: styled.h3`
    font-size: 16px;
    line-height: 1.25em;
    margin: 0 0 6px;
    color: ${BLACK};
  `,
}

const Heading = ({ size, ...props }) => {
  const Component = Level[size]
  return <Component {...props} />
}

Heading.propTypes = {
  size: oneOf(Object.keys(Level)),
}

Heading.defaultProps = {
  size: 'h1',
}

export default Heading
