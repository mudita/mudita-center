import React from "react"
import Modal from "Renderer/components/core/modal/modal.component"
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

interface SyncContactsModal {
  onClose?: () => void
  onGoogleButtonClick?: () => void
  onAppleButtonClick?: () => void
}

const SyncContactsModal: FunctionComponent<SyncContactsModal> = ({
  onClose = noop,
  onAppleButtonClick = noop,
  onGoogleButtonClick = noop,
}) => (
  <Modal
    size={ModalSize.Small}
    title={intl.formatMessage({
      id: "view.name.phone.contacts.syncModalTitle",
    })}
    closeButton={false}
    onClose={onClose}
  >
    <ModalText
      displayStyle={TextDisplayStyle.MediumLightText}
      message={{
        id: "view.name.phone.contacts.syncModalText",
      }}
    />
    <ButtonsContainer>
      <ButtonWrapper>
        <SyncButton
          displayStyle={DisplayStyle.Primary}
          data-testid={"modal-action-button"}
          label={intl.formatMessage({
            id: "view.name.phone.contacts.googleButtonText",
          })}
          Icon={Type.Google}
          onClick={onGoogleButtonClick}
        />
        <SyncButton
          displayStyle={DisplayStyle.Primary}
          data-testid={"modal-action-button"}
          label={intl.formatMessage({
            id: "view.name.phone.contacts.appleButtonText",
          })}
          Icon={Type.Apple}
          onClick={onAppleButtonClick}
        />
      </ButtonWrapper>
    </ButtonsContainer>
  </Modal>
)

export default SyncContactsModal
