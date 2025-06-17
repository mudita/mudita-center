/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { ModalSize } from "app-theme/models"
import { ModalContent } from "./modal-content"
import { ModalTitleIcon } from "./modal-title-icon"
import { ModalTitle } from "./modal-title"
import { ModalScrollableContent } from "./modal-scrollable-content"
import { ModalButtons } from "./modal-buttons"
import { ModalSizeController } from "./modal-size-controller"
import {
  ModalVisibilityController,
  ModalVisibilityControllerHidden,
} from "./modal-visibility-controller"
import { ModalCloseButton } from "./modal-close-button"
import { ModalDenseContent } from "./modal-dense-content"
import styled, { keyframes } from "styled-components"

interface Props
  extends PropsWithChildren,
    Omit<ComponentProps<typeof Wrapper>, "$overlayHidden"> {
  opened: boolean
  onClose?: VoidFunction
  overlayHidden?: boolean
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
  onClose,
  overlayHidden,
  size = ModalSize.Small,
  customStyles = {},
  className,
  ...rest
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)

  const handleAnimationEnd = useCallback(() => {
    if (closing) {
      dialogRef.current?.close()
      setClosing(false)
      if (onClose) {
        onClose()
      }
    }
  }, [closing, onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (opened && dialog) {
      if (!dialog.open) {
        dialog.inert = true
        dialog.showModal()
        dialog.inert = false
      }
    } else if (dialog?.open) {
      setClosing(true)
    }
  }, [opened])

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.addEventListener("animationend", handleAnimationEnd)

    return () => {
      dialog?.removeEventListener("animationend", handleAnimationEnd)
    }
  }, [handleAnimationEnd])

  return (
    <Wrapper
      ref={dialogRef}
      className={closing ? "closing" : ""}
      onCancel={() => setClosing(true)}
      $overlayHidden={overlayHidden}
      {...rest}
    >
      <ModalContent size={size} {...customStyles}>
        {children}
      </ModalContent>
    </Wrapper>
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0;  }
`

const Wrapper = styled.dialog<{
  $overlayHidden?: boolean
}>`
  outline: none;
  border: none;
  padding: 0;
  box-shadow: 0 1rem 5rem ${({ theme }) => theme.app.color.blackAlpha.light};
  background-color: ${({ theme }) => theme.app.color.white};
  border-radius: ${({ theme }) => theme.app.radius.sm};

  &,
  &::backdrop {
    animation-duration: ${({ theme }) =>
      theme.app.constants.modalTransitionDuration}ms;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }

  &::backdrop {
    background-color: ${({ theme, $overlayHidden }) =>
      $overlayHidden ? "transparent" : theme.app.color.black + "4D"} !important;
    animation-name: ${fadeIn};
  }

  &[open] {
    animation-name: ${fadeIn};
  }

  &.closing {
    &,
    &::backdrop {
      animation-name: ${fadeOut};
    }
  }

  &:has(${ModalVisibilityControllerHidden}) {
    display: none;
  }
`
