import React from 'react'
import styled from 'styled-components'
import { oneOf } from 'prop-types'

const VARIANT = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

const StyledHeading = {
  h1: styled.h1`
    font-size: 48px;
    line-height: 56px;
    margin: initial;
  `,
  h2: styled.h2`
    font-size: 40px;
    line-height: 48px;
    margin: initial;
  `,
  h3: styled.h3`
    font-size: 32px;
    line-height: 40px;
    margin: initial;
  `,
  h4: styled.h4`
    font-size: 24px;
    line-height: 32px;
    margin: initial;
  `,
  h5: styled.h5`
    font-size: 20px;
    line-height: 28px;
    margin: initial;
  `,
  h6: styled.h6`
    font-size: 14px;
    line-height: 20px;
    margin: initial;
  `,
}

const Heading = ({ variant, ...props }) => {
  const Component = StyledHeading[variant]
  return <Component {...props} />
}

Heading.propTypes = {
  variant: oneOf(Object.keys(VARIANT)),
}

Heading.defaultProps = {
  variant: VARIANT.h1,
}

Heading.variants = VARIANT

export default Heading
