import React from 'react'
import { Link } from 'gatsby'
import * as Icon from 'react-feather'
import styled, { css } from 'styled-components'
import { string, object, oneOfType } from 'prop-types'

import { CUSTOM_GRAY, LIGHT_GRAY, LIGHT_GRAY_2, BLACK } from '../../theme'

const styles = css`
  border-radius: 3px;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  padding: 0;
  background: ${CUSTOM_GRAY};
  color: ${BLACK};
  transition: all 0.1s linear;

  &[disabled] {
    color: ${LIGHT_GRAY_2};
    pointer-events: none;
  }

  &:hover, &:focus {
    background: ${LIGHT_GRAY};
  }

  &:active {
    background: ${LIGHT_GRAY_2};
  }
`

const Inner = styled.div`
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;

  & svg {
    fill: none;
    margin-right: ${({ hasText }) => (hasText ? 4 : 0)}px;
  }
`

const StyledButton = styled.button`
  ${styles};
`

const StyledLink = styled(Link)`
  ${styles};
`

const Button = ({ icon, children, ...props }) => {
  const FeatherIcon = icon ? Icon[icon] || Icon.HelpCircle : null

  const hasText = Boolean(children)

  const IconComponent = FeatherIcon && <FeatherIcon size={hasText ? 14 : 18} />

  const inner = (
    <Inner hasText={hasText}>
      {IconComponent} {children}
    </Inner>
  )

  if (props.to) {
    return <StyledLink {...props}>{inner}</StyledLink>
  }

  return <StyledButton {...props}>{inner}</StyledButton>
}

Button.propTypes = {
  children: string,
  icon: string,
  to: oneOfType([string, object]),
}

export default Button
