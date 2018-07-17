import React from 'react'
import { Link } from 'gatsby'
import { object } from 'prop-types'
import { ifProp } from 'styled-tools'
import { css } from 'styled-components'

import getPaletteColor from '../../../services/getPaletteColor'
import { Paper, Paragraph } from '../../atoms'
// import { Box } from '../../utilities'

const Container = Paper.extend`
  cursor: pointer;
  margin-bottom: 8px;
  outline: none;
  transition: background 85ms ease;

  &:hover {
    background: ${getPaletteColor('shades', 100)};
  }

  ${ifProp(
    'isDragging',
    css`
      border: 1px solid ${getPaletteColor('shades', 300)};
      border-bottom-color: ${getPaletteColor('shades', 300)};
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    `
  )};
`

const Title = Paragraph.extend`
  color: ${getPaletteColor('shades', 600)};
  margin: 0;
  overflow: hidden;
  word-wrap: break-word;
`

// const IconContainer = Box.extend`
//   color: ${getPaletteColor('shades', 400)};
// `

class CardFront extends React.PureComponent {
  static propTypes = {
    card: object,
  }

  render () {
    const { card, ...props } = this.props
    const encodedId = window.btoa(`${card.boardId}:${card.listId}:${card.id}`)
    return (
      <Link
        to={{ pathname: `/c/${encodedId}`, state: { modal: true } }}
        style={{ textDecoration: 'none' }}
      >
        <Container {...props}>
          <Title>{card.title}</Title>
          {/* <IconContainer mt='8px'>
          <Icon name='Description' size='small' />
        </IconContainer> */}
        </Container>
      </Link>
    )
  }
}

export default CardFront
