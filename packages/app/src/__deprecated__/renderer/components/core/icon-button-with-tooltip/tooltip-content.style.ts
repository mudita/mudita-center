import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

export enum TooltipContentType {
  primary,
  secondary,
}
interface TooltipContentProps {
  type: TooltipContentType
}

const primaryContentCss = css`
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
`
const secondaryContentCss = css`
  background-color: ${backgroundColor("disabled")};
  padding: 0.4rem 0.8rem;
  border-radius: ${borderRadius("medium")};
`

export const TooltipContent = styled.div<TooltipContentProps>`
  ${({ type }) =>
    type === TooltipContentType.primary
      ? primaryContentCss
      : secondaryContentCss}
`
