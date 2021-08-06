import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"

export const Title = styled(Text)`
  font-size: 3rem;
  margin-bottom: 1.6rem;
  font-weight: ${fontWeight("default")};
`
