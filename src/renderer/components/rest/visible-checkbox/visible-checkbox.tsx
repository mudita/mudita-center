import styled, { css } from "styled-components"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"

export const animatedOpacityActiveStyles = css`
  opacity: 1;
  visibility: visible;
`

export const animatedOpacityStyles = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")};
`

export const VisibleCheckbox = styled(InputCheckbox)<{ visible?: boolean }>`
  ${animatedOpacityStyles};
  ${({ visible }) => visible && animatedOpacityActiveStyles};
`
