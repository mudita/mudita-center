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
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Size } from "Renderer/components/core/button/button.config"

const messages = defineMessages({
  backupModalHeaderTitle: {
    id: "module.overview.backupModalHeaderTitle",
  },
  backupModalTitle: {
    id: "module.overview.backupModalTitle",
  },
  backupModalDescription: {
    id: "module.overview.backupModalDescription",
  },
  backupModalButtonCancel: {
    id: "module.overview.backupModalButtonCancel",
  },
  backupModalButtonCreateBackup: {
    id: "module.overview.backupModalButtonCreateBackup",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p:first-of-type {
    margin-top: 0;
  }
`

const Modal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <ModalDialog
    size={size}
    title={intl.formatMessage(messages.backupModalHeaderTitle)}
    actionButtonSize={Size.FixedMedium}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

export const BackupModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return (
    <Modal
      closeButtonLabel={intl.formatMessage(messages.backupModalButtonCancel)}
      actionButtonLabel={intl.formatMessage(
        messages.backupModalButtonCreateBackup
      )}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={Type.BackupFolder} width={4} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.backupModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.backupModalDescription}
      />
    </Modal>
  )
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
