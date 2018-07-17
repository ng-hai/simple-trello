import styled from 'styled-components'
import { prop } from 'styled-tools'

const Box = styled.div`
  margin-top: ${prop('mt', prop('my', prop('m')))};
  margin-right: ${prop('mr', prop('mx', prop('m')))};
  margin-bottom: ${prop('mb', prop('my', prop('m')))};
  margin-left: ${prop('ml', prop('mx', prop('m')))};
  padding-top: ${prop('pt', prop('py', prop('p')))};
  padding-right: ${prop('pr', prop('px', prop('p')))};
  padding-bottom: ${prop('pb', prop('py', prop('p')))};
  padding-left: ${prop('pl', prop('px', prop('p')))};
`

export default Box
