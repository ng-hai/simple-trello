import React from 'react'
import { ifProp } from 'styled-tools'
import styled from 'styled-components'
import { string, oneOf } from 'prop-types'

const SvgIcon = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  margin-right: ${ifProp('hasText', '4px')};

  & > svg {
    font-size: ${ifProp({ size: 'medium' }, '24px', '20px')};
    stroke-width: ${ifProp({ size: 'medium' }, '2px', '1.5px')};
  }
`

const Icon = ({ name, ...props }) => {
  let Component
  try {
    Component = require(`./icons/${name}`).default
  } catch (error) {
    Component = require(`./icons/Help`).default
  }

  return (
    <SvgIcon {...props}>
      <Component />
    </SvgIcon>
  )
}

Icon.propTypes = {
  name: string.isRequired,
  size: oneOf(['medium', 'small']),
}

Icon.defaultProps = {
  size: 'medium',
}

export default Icon
