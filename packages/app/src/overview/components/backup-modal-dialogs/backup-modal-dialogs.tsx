/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import {
  ModalDialog,
  RoundIconWrapper,
  ModalMainText,
} from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
  backupSpinnerModalTitle: {
    id: "module.overview.backupSpinnerModalTitle",
  },
  backupSpinnerModalDescription: {
    id: "module.overview.backupSpinnerModalDescription",
  },
  backupFailureModalTitle: {
    id: "module.overview.backupFailureModalTitle",
  },
  backupFailureModalDescription: {
    id: "module.overview.backupSpinnerModalDescription",
  },
  backupFailureModalSecondaryButton: {
    id: "module.overview.backupFailureModalSecondaryButton",
  },
  backupFailureModalMainButton: {
    id: "module.overview.backupFailureModalMainButton",
  },
  backupSuccessModalTitle: {
    id: "module.overview.backupSuccessModalTitle",
  },
  backupSuccessModalDescription: {
    id: "module.overview.backupSuccessModalDescription",
  },
  backupSuccessModalMainButton: {
    id: "module.overview.backupSuccessModalMainButton",
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
    actionButtonSize={Size.FixedSmall}
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
        <Icon type={IconType.BackupFolder} width={4} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.backupModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.backupModalDescription}
      />
    </Modal>
  )
}

export const BackupSpinnerModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return (
    <Modal closeButton={false} closeable={false} {...props}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={3} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.backupSpinnerModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.backupSpinnerModalDescription}
      />
    </Modal>
  )
}

interface BackupFailureWithHelpModalProps
  extends ComponentProps<typeof ModalDialog> {
  secondaryActionButtonClick: () => void
}

export const BackupFailureModal: FunctionComponent<
  BackupFailureWithHelpModalProps
> = ({ secondaryActionButtonClick, onClose, ...props }) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal
      closeButtonLabel={intl.formatMessage(
        messages.backupFailureModalSecondaryButton
      )}
      onCloseButton={secondaryActionButtonClick}
      onClose={handleOnClose}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={IconType.Fail} width={4} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.backupFailureModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.backupFailureModalDescription}
      />
    </Modal>
  )
}

interface BackupSuccessModalProps extends ComponentProps<typeof ModalDialog> {
  description: string
}

export const BackupSuccessModal: FunctionComponent<BackupSuccessModalProps> = ({
  description,
  ...props
}) => {
  return (
    <Modal
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.backupSuccessModalMainButton
      )}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={IconType.CheckCircle} width={3} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.backupSuccessModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.backupSuccessModalDescription}
      />
      <ModalText displayStyle={TextDisplayStyle.Paragraph3}>
        {description}
      </ModalText>
    </Modal>
  )
}
