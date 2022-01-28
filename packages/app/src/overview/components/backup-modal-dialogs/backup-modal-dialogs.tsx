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
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"

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
        displayStyle={TextDisplayStyle.QuaternaryHeading}
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
  return (
    <Modal closeButton={false} closeable={false} {...props}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={3} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.QuaternaryHeading}
        message={messages.backupSpinnerModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.backupSpinnerModalDescription}
      />
    </Modal>
  )
}

interface BackupFailureWithHelpModalProps
  extends ComponentProps<typeof ModalDialog> {
  secondaryActionButtonClick: () => void
}

export const BackupFailureModal: FunctionComponent<BackupFailureWithHelpModalProps> =
  ({ secondaryActionButtonClick, onClose, ...props }) => {
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
          <Icon type={Type.Fail} width={4} />
        </RoundIconWrapper>
        <ModalText
          displayStyle={TextDisplayStyle.QuaternaryHeading}
          message={messages.backupFailureModalTitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
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
        <Icon type={Type.CheckCircle} width={3} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.QuaternaryHeading}
        message={messages.backupSuccessModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.backupSuccessModalDescription}
      />
      <ModalText displayStyle={TextDisplayStyle.MediumBoldText}>
        {description}
      </ModalText>
    </Modal>
  )
}
