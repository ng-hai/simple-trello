import React from 'react'
import { Link } from 'gatsby'
import { ifNotProp } from 'styled-tools'
import styled, { css } from 'styled-components'
import { string, object, oneOfType, oneOf } from 'prop-types'

import getPaletteColor from '../../../services/getPaletteColor'
import Icon from '../icon'

const sizes = [
  {
    name: 'XSmall',
    style: css`
      height: 32px;
      font-size: 14px;
      padding: 0 16px;
    `,
  },
  {
    name: 'Small',
    style: css`
      height: 40px;
      font-size: 16px;
      padding: 0 16px;
    `,
  },
  {
    name: 'Medium',
    style: css`
      height: 48px;
      font-size: 16px;
      padding: 0 16px;
    `,
  },
  {
    name: 'Large',
    style: css`
      height: 56px;
      font-size: 20px;
      padding: 0 24px;
    `,
  },
]

const variants = [
  {
    name: 'LightGrey',
    style: css`
      color: ${getPaletteColor('shades', 600)};
      background: ${getPaletteColor('shades', 200)};
      box-shadow: 0 1px 0 0 ${getPaletteColor('shades', 300)};
      &:hover,
      &:focus {
        background: ${getPaletteColor('shades', 300)};
        box-shadow: 0 1px 0 0 ${getPaletteColor('shades', 400)};
      }
      &:active {
        background: ${getPaletteColor('shades', 400)};
        color: ${getPaletteColor('shades', 0)};
        transition: background 0s ease;
      }
    `,
  },
  {
    name: 'DarkGrey',
    style: css`
      color: ${getPaletteColor('shades', 0)};
      background: ${getPaletteColor('shades', 600)};
      box-shadow: 0 1px 0 0 ${getPaletteColor('shades', 700)};
      &:hover,
      &:focus {
        background: ${getPaletteColor('shades', 700)};
        box-shadow: 0 1px 0 0 ${getPaletteColor('shades', 900)};
      }
      &:active {
        background: ${getPaletteColor('shades', 900)};
        transition: background 0s ease;
      }
    `,
  },
  {
    name: 'Green',
    style: css`
      color: ${getPaletteColor('shades', 0)};
      background: ${getPaletteColor('green', 600)};
      box-shadow: 0 1px 0 0 ${getPaletteColor('green', 700)};
      &:hover,
      &:focus {
        background: ${getPaletteColor('green', 700)};
        box-shadow: 0 1px 0 0 ${getPaletteColor('green', 800)};
      }
      &:active {
        background: ${getPaletteColor('green', 800)};
        transition: background 0s ease;
      }
    `,
  },
  {
    name: 'Blue',
    style: css`
      color: ${getPaletteColor('shades', 0)};
      background: ${getPaletteColor('blue', 500)};
      box-shadow: 0 1px 0 0 ${getPaletteColor('blue', 600)};
      &:hover,
      &:focus {
        background: ${getPaletteColor('blue', 600)};
        box-shadow: 0 1px 0 0 ${getPaletteColor('blue', 700)};
      }
      &:active {
        background: ${getPaletteColor('blue', 700)};
        transition: background 0s ease;
      }
    `,
  },
  {
    name: 'Red',
    style: css`
      color: ${getPaletteColor('shades', 0)};
      background: ${getPaletteColor('red', 500)};
      box-shadow: 0 1px 0 0 ${getPaletteColor('red', 700)};
      &:hover,
      &:focus {
        background: ${getPaletteColor('red', 600)};
        box-shadow: 0 1px 0 0 ${getPaletteColor('red', 800)};
      }
      &:active {
        background: ${getPaletteColor('red', 800)};
        transition: background 0s ease;
      }
    `,
  },
]

const VARIANT = variants.reduce((names, variant) => {
  names[variant.name] = variant.name
  return names
}, {})

const SIZE = sizes.reduce((names, size) => {
  names[size.name] = size.name
  return names
}, {})

const getVariantStyle = ({ variant, iconButton }) => {
  if (iconButton) {
    return null
  }
  const existVariant = variants.find(({ name }) => name === variant)
  return existVariant ? existVariant.style : null
}

const getSizeStyle = ({ size }) => {
  const existSize = sizes.find(({ name }) => name === size)
  return existSize ? existSize.style : null
}

const getIconButtonStyles = ({ iconButton }) => {
  if (!iconButton) {
    return null
  }

  return css`
    min-width: 32px;
    height: 32px;
    padding: ${ifNotProp('hasIconText', 0)};
    justify-content: center;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.4);
    }
    &:active {
      background: rgba(255, 255, 255, 0.6);
      transition: background 0s ease;
    }
  `
}

const styles = css`
  border-radius: 3px;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  white-space: nowrap;
  transition: background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease,
    color 0.3s ease;

  &[disabled] {
    pointer-events: none;
    color: #a5acb0;
    background: #f9f9f9;
    box-shadow: none;
    transition: all 50ms ease;
  }

  ${getVariantStyle};
  ${getSizeStyle};
  ${getIconButtonStyles};
`

const StyledButton = styled.button`
  ${styles};
`

const StyledLink = StyledButton.withComponent(Link)

const Button = ({ children, icon, iconText, ...props }) => {
  const isIconButton = !children
  const buttonIcon = icon && (
    <Icon hasText={Boolean(children) || Boolean(iconText)} name={icon} />
  )

  if (isIconButton) {
    delete props.variant
  }

  if (props.to) {
    return (
      <StyledLink
        iconButton={isIconButton}
        hasIconText={Boolean(iconText)}
        {...props}
      >
        {buttonIcon}
        {iconText}
        {children}
      </StyledLink>
    )
  }

  return (
    <StyledButton
      iconButton={isIconButton}
      hasIconText={Boolean(iconText)}
      {...props}
    >
      {buttonIcon}
      {iconText}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  children: string,
  icon: string,
  iconText: string,
  to: oneOfType([string, object]),
  variant: oneOf(Object.keys(VARIANT)),
  size: oneOf(Object.keys(SIZE)),
}

Button.defaultProps = {
  variant: 'LightGrey',
  size: 'XSmall',
}

export default Button
