/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import moment from "moment"
import { ModalMainText } from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog-shared"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  restoreModalHeaderTitle: {
    id: "module.overview.restoreModalHeaderTitle",
  },
  restoreModalTitle: {
    id: "module.overview.restoreModalTitle",
  },
  restoreModalDescription: {
    id: "module.overview.restoreModalDescription",
  },
  restoreModalButtonCancel: {
    id: "module.overview.restoreModalButtonCancel",
  },
  restoreModalButtonCreateRestore: {
    id: "module.overview.restoreModalButtonCreateRestore",
  },
  restoreSpinnerModalTitle: {
    id: "module.overview.restoreSpinnerModalTitle",
  },
  restoreSpinnerModalDescription: {
    id: "module.overview.restoreSpinnerModalDescription",
  },
  restoreFailureModalTitle: {
    id: "module.overview.restoreFailureModalTitle",
  },
  restoreFailureModalDescription: {
    id: "module.overview.restoreFailureModalDescription",
  },
  restoreFailureModalSecondaryButton: {
    id: "module.overview.restoreFailureModalSecondaryButton",
  },
  restoreFailureModalMainButton: {
    id: "module.overview.restoreFailureModalMainButton",
  },
  restoreSuccessModalTitle: {
    id: "module.overview.restoreSuccessModalTitle",
  },
  restoreSuccessModalDescription: {
    id: "module.overview.restoreSuccessModalDescription",
  },
  restoreSuccessModalMainButton: {
    id: "module.overview.restoreSuccessModalMainButton",
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
    title={intl.formatMessage(messages.restoreModalHeaderTitle)}
    actionButtonSize={Size.FixedSmall}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

interface RestoreModalProps extends ComponentProps<typeof ModalDialog> {
  backupDate: Date
}

export const RestoreModal: FunctionComponent<RestoreModalProps> = ({
  backupDate,
  ...props
}) => {
  return (
    <Modal
      closeButtonLabel={intl.formatMessage(messages.restoreModalButtonCancel)}
      actionButtonLabel={intl.formatMessage(
        messages.restoreModalButtonCreateRestore
      )}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={IconType.BackupFolder} width={4} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.restoreModalTitle}
      />
      <ModalText displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
        {moment(backupDate).format("dddd, MMMM D, h:mm a")}
      </ModalText>
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.restoreModalDescription}
        color="secondary"
      />
    </Modal>
  )
}

export const RestoreSpinnerModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return (
    <Modal closeButton={false} closeable={false} {...props}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={3} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.restoreSpinnerModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.restoreSpinnerModalDescription}
      />
    </Modal>
  )
}

interface RestoreFailureWithHelpModalProps
  extends ComponentProps<typeof ModalDialog> {
  secondaryActionButtonClick: () => void
}

export const RestoreFailureModal: FunctionComponent<
  RestoreFailureWithHelpModalProps
> = ({ secondaryActionButtonClick, onClose, ...props }) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal
      closeButtonLabel={intl.formatMessage(
        messages.restoreFailureModalSecondaryButton
      )}
      onCloseButton={secondaryActionButtonClick}
      onClose={handleOnClose}
      actionButtonSize={Size.FixedSmall}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={IconType.Fail} width={4} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.restoreFailureModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.restoreFailureModalDescription}
      />
    </Modal>
  )
}

export const RestoreSuccessModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return (
    <Modal
      closeButton={false}
      actionButtonLabel={intl.formatMessage(
        messages.restoreSuccessModalMainButton
      )}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={IconType.CheckCircle} width={3} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.restoreSuccessModalTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.restoreSuccessModalDescription}
      />
    </Modal>
  )
}
