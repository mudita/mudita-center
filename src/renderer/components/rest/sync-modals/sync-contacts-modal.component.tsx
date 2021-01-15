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
} from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { SyncContactsModalTestIds } from "Renderer/components/rest/sync-modals/sync-contacts-modal-test-ids.enum"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "view.name.phone.contacts.syncModalTitle",
  },
  text: {
    id: "view.name.phone.contacts.syncModalText",
  },
  googleButtonText: {
    id: "view.name.phone.contacts.googleButtonText",
  },
  appleButtonText: {
    id: "view.name.phone.contacts.appleButtonText",
  },
  manualImportText: {
    id: "view.name.phone.contacts.manualImportText",
  },
})

interface SyncContactsModal extends ModalProps {
  onGoogleButtonClick?: () => void
  onAppleButtonClick?: () => void
  onManualImportClick?: (inputElement: HTMLInputElement) => void
}

const SyncContactsModal: FunctionComponent<SyncContactsModal> = ({
  onClose = noop,
  onAppleButtonClick,
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
          {onGoogleButtonClick && (
            <SyncButton
              displayStyle={DisplayStyle.Primary}
              label={intl.formatMessage(messages.googleButtonText)}
              Icon={Type.Google}
              onClick={onGoogleButtonClick}
              data-testid={SyncContactsModalTestIds.GoogleButton}
            />
          )}
          {onAppleButtonClick && (
            <SyncButton
              displayStyle={DisplayStyle.Primary}
              label={intl.formatMessage(messages.appleButtonText)}
              Icon={Type.Apple}
              onClick={onAppleButtonClick}
            />
          )}
          {onManualImportClick && (
            <>
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
            </>
          )}
        </ButtonWrapper>
      </ButtonsContainer>
    </Modal>
  )
}

export default SyncContactsModal
