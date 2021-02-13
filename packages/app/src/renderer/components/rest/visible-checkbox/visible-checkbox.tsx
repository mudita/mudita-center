import styled from "styled-components"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"

export const VisibleCheckbox = styled(InputCheckbox)<{ visible?: boolean }>`
  ${animatedOpacityStyles};
  ${({ visible }) => visible && animatedOpacityActiveStyles};
`
