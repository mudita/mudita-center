/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useRef } from "react"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import {
  ButtonsContainer,
  ButtonWrapper,
  ModalText,
  SyncButton,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"
import { defineMessages } from "react-intl"

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

interface SyncContactsModal extends ModalProps {
  onGoogleButtonClick: () => void
  onOutlookButtonClick: () => void
  onAppleButtonClick?: () => void
  onManualImportClick: (inputElement: HTMLInputElement) => void
}

const SyncContactsModal: FunctionComponent<SyncContactsModal> = ({
  onClose = noop,
  onAppleButtonClick,
  onOutlookButtonClick,
  onGoogleButtonClick,
  onManualImportClick,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleManualImportClick = () => {
    if (onManualImportClick && fileInputRef.current) {
      onManualImportClick(fileInputRef.current)
    }
  }

  return (
    <Modal
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      onClose={onClose}
    >
      <ModalText
        displayStyle={TextDisplayStyle.MediumLightText}
        message={messages.text}
      />
      <ButtonsContainer>
        <ButtonWrapper>
          <SyncButton
            displayStyle={DisplayStyle.Primary}
            label={intl.formatMessage(messages.googleButtonText)}
            Icon={Type.Google}
            onClick={onGoogleButtonClick}
            data-testid={SyncContactsModalTestIds.GoogleButton}
          />

          <SyncButton
            displayStyle={DisplayStyle.Primary}
            label={intl.formatMessage(messages.outlookButtonText)}
            Icon={Type.Outlook}
            onClick={onOutlookButtonClick}
            data-testid={SyncContactsModalTestIds.OutlookButton}
          />
          {onAppleButtonClick && (
            <SyncButton
              displayStyle={DisplayStyle.Primary}
              label={intl.formatMessage(messages.appleButtonText)}
              Icon={Type.Apple}
              onClick={onAppleButtonClick}
            />
          )}
          <SyncButton
            displayStyle={DisplayStyle.Primary}
            label={intl.formatMessage(messages.manualImportText)}
            Icon={Type.Upload}
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
    </Modal>
  )
}

export default SyncContactsModal
