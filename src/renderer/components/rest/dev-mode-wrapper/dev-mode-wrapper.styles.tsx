import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

const stripe = textColor("grey")
export const DevModeInside = styled.div`
  background: ${backgroundColor("light")};
  padding: 1.5rem;
  display: none;
`
export const DevModeToggle = styled(ButtonComponent)`
  line-height: 3rem;
  width: auto;
  height: 3rem;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: 0;
  background: ${backgroundColor("light")};
`
export const DevModeContainer = styled.div<{ active: boolean }>`
  ${({ active }) =>
    active &&
    css`
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        ${stripe} 10px,
        ${stripe} 20px
      );
      padding: 1.5rem;

      ${DevModeInside} {
        display: block;
      }

      ${DevModeToggle} {
        opacity: 0.5;
      }
    `}
`
