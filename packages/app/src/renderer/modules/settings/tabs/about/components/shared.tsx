
import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"

export const WindowContainer = styled.div`
  margin: 4.2rem 21rem 3.4rem;
  min-width: 5.9rem;
`
export const WindowHeader = styled(Text)`
  font-weight: normal;
  margin-bottom: 4rem;
`
export const WindowTitle = styled(Text)`
  margin: 1.8rem 0 1.6rem;
`

export const LightText = styled(Text)`
  font-weight: 300;
  line-height: 1.57;
  margin-bottom: 1.6rem;
`

export const LightTextNested = styled(Text)`
  font-weight: 300;
  line-height: 1.57;
  margin-bottom: 1.6rem;
  margin-left: 3rem;
`