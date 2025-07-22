/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { ModalLayer } from "app-theme/models"
import { ModalVisibilityControllerHidden } from "./modal-visibility-controller"

export const ModalOverlay = styled.div<{
  $hidden?: boolean
  $layer?: ModalLayer
}>`
  --modal-transition-duration: ${({ theme }) =>
    theme.app.constants.modalTransitionDuration}ms;
  --modal-transition-timing-function: ease-out;
  --modal-opacity: 1;
  --modal-visibility: visible;

  z-index: ${({ $layer }) => $layer ?? ModalLayer.Default};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, $hidden }) =>
    $hidden ? "transparent" : theme.app.color.black + "4D"} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--modal-transition-duration)
    var(--modal-transition-timing-function);

  &.ReactModal__Overlay--after-open {
    opacity: 1;
  }

  &.ReactModal__Overlay--before-close {
    opacity: 0;
  }

  &:has(${ModalVisibilityControllerHidden}) {
    opacity: 0;
    visibility: hidden;
  }
`
