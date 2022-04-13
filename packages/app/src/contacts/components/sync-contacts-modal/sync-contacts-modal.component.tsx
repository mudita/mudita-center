/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useRef, ComponentProps } from "react"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  ButtonsContainer,
  ButtonWrapper,
  ModalText,
  SyncButton,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"
import { defineMessages } from "react-intl"
import GoogleButton from "react-google-button"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.contacts.syncModalTitle",
  },
  text: {
    id: "module.contacts.syncModalText",
  },
  googleButtonText: {
    id: "module.contacts.googleButtonText",
  },
  outlookButtonText: {
    id: "module.contacts.outlookButtonText",
  },
  appleButtonText: {
    id: "module.contacts.appleButtonText",
  },
  manualImportText: {
    id: "module.contacts.manualImportText",
  },
})

interface Props extends ComponentProps<typeof ModalDialog> {
  onGoogleButtonClick: () => void
  onOutlookButtonClick: () => void
  onAppleButtonClick?: () => void
  onManualImportClick: (inputElement: HTMLInputElement) => void
}

const SyncContactsModal: FunctionComponent<Props> = ({
  onClose = noop,
  onAppleButtonClick,
  onOutlookButtonClick,
  onGoogleButtonClick,
  onManualImportClick,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleManualImportClick = () => {
    if (onManualImportClick && fileInputRef.current) {
      onManualImportClick(fileInputRef.current)
    }
  }

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      onClose={onClose}
      {...props}
    >
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph2}
        message={messages.text}
      />
      <ButtonsContainer>
        <ButtonWrapper>
          <GoogleButton
            onClick={onGoogleButtonClick}
            type="dark"
            label={intl.formatMessage(messages.googleButtonText)}
            data-testid={SyncContactsModalTestIds.GoogleButton}
          />

          <SyncButton
            labelMessage={messages.outlookButtonText}
            Icon={IconType.Outlook}
            onClick={onOutlookButtonClick}
            data-testid={SyncContactsModalTestIds.OutlookButton}
          />
          {onAppleButtonClick && (
            <SyncButton
              labelMessage={messages.appleButtonText}
              Icon={IconType.Apple}
              onClick={onAppleButtonClick}
            />
          )}
          <SyncButton
            labelMessage={messages.manualImportText}
            Icon={IconType.Upload}
            onClick={handleManualImportClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".vcf"
            hidden
            multiple
            data-testid={SyncContactsModalTestIds.FileInput}
          />
        </ButtonWrapper>
      </ButtonsContainer>
    </ModalDialog>
  )
}

export default SyncContactsModal
