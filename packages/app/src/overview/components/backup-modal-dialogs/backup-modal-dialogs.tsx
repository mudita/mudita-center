/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p + p {
    margin-top: 1.2rem;
  }
`

const Modal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <ModalDialog size={size} {...props}>
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

export const BackupModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
  > = ({ ...props }) => {
  return <Modal {...props}></Modal>
}

export const BackupSpinnerModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return <Modal {...props}></Modal>
}

export const BackupFailureWithHelpModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return <Modal {...props}></Modal>
}

export const BackupSuccessModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return <Modal {...props}></Modal>
}
