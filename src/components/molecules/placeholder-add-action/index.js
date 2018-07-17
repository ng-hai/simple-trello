import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import { Icon, Paragraph } from '../../atoms'

const ActionPlaceholder = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;

  ${Paragraph} {
    margin: 0;
  }
`

const PlaceholderAddAction = ({ actionContent, ...props }) => {
  return (
    <ActionPlaceholder {...props}>
      <Icon name='Plus' />
      <Paragraph>{actionContent}</Paragraph>
    </ActionPlaceholder>
  )
}

PlaceholderAddAction.propTypes = {
  actionContent: string,
}

export default PlaceholderAddAction
