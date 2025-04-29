/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ReactModal from "react-modal"
import { FunctionComponent, PropsWithChildren, useCallback } from "react"
import { ModalLayer, ModalSize } from "app-theme/models"
import { theme } from "app-theme/utils"
import { ModalContent } from "./modal-content"
import { ModalOverlay } from "./modal-overlay"
import { ModalTitleIcon } from "./modal-title-icon"
import { ModalTitle } from "./modal-title"
import { ModalScrollableContent } from "./modal-scrollable-content"
import { ModalButtons } from "./modal-buttons"
import { ModalSizeController } from "./modal-size-controller"
import { ModalVisibilityController } from "./modal-visibility-controller"
import { ModalCloseButton } from "./modal-close-button"
import { ModalDenseContent } from "./modal-dense-content"

interface Props extends PropsWithChildren, Omit<ReactModal.Props, "isOpen"> {
  opened: boolean
  overlayHidden?: boolean
  layer?: ModalLayer
  size?: ModalSize
  customStyles?: {
    maxHeight?: string | number
    width?: string | number
    padding?: string | number
    gap?: string | number
  }
}

interface Subcomponents {
  TitleIcon: typeof ModalTitleIcon
  Title: typeof ModalTitle
  DenseContent: typeof ModalDenseContent
  ScrollableContent: typeof ModalScrollableContent
  Buttons: typeof ModalButtons
  CloseButton: typeof ModalCloseButton
  SizeController: typeof ModalSizeController
  VisibilityController: typeof ModalVisibilityController
}

export const Modal: FunctionComponent<Props> & Subcomponents = ({
  children,
  opened,
  overlayHidden,
  layer = ModalLayer.Default,
  size = ModalSize.Small,
  customStyles = {},
  ...rest
}) => {
  const content: NonNullable<ReactModal["props"]["contentElement"]> =
    useCallback(
      (props, children) => {
        return (
          <ModalContent {...props} size={size} layer={layer} {...customStyles}>
            {children}
          </ModalContent>
        )
      },
      [customStyles, layer, size]
    )

  const overlay: NonNullable<ReactModal["props"]["overlayElement"]> =
    useCallback(
      (props, children) => {
        return (
          <ModalOverlay {...props} $hidden={overlayHidden}>
            {children}
          </ModalOverlay>
        )
      },
      [overlayHidden]
    )
  return (
    <ReactModal
      {...rest}
      contentElement={content}
      overlayElement={overlay}
      isOpen={opened}
      closeTimeoutMS={theme.app.constants.modalTransitionDuration}
    >
      {children}
    </ReactModal>
  )
}

Modal.TitleIcon = ModalTitleIcon
Modal.Title = ModalTitle
Modal.DenseContent = ModalDenseContent
Modal.ScrollableContent = ModalScrollableContent
Modal.Buttons = ModalButtons
Modal.CloseButton = ModalCloseButton
Modal.SizeController = ModalSizeController
Modal.VisibilityController = ModalVisibilityController
