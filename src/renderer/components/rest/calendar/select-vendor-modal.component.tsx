import React, { useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl } from "Renderer/utils/intl"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ButtonsContainer,
  ButtonWrapper,
  SyncButton,
} from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { SelectVendorModalTestIds } from "Renderer/components/rest/calendar/select-vendor-modal-test-ids.enum"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.selectVendor.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.selectVendor.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.selectVendor.body",
  },
  button: {
    id: "common.loginGoogleButton",
  },
})

export interface SelectVendorModalProps extends ModalProps {
  onGoogleButtonClick: () => void
  onManualImportClick: (inputElement: HTMLInputElement) => void
}

const SelectVendorModal: FunctionComponent<SelectVendorModalProps> = ({
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
    <Modal
      {...props}
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      closeButton={false}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={Type.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
          message={messages.body}
        />
      </ModalContent>
      <ButtonsContainer>
        <ButtonWrapper>
          <SyncButton
            labelMessage={messages.button}
            onClick={onGoogleButtonClick}
            Icon={Type.Google}
            data-testid={SelectVendorModalTestIds.GoogleButton}
          />
          {onManualImportClick && (
            <>
              <SyncButton
                displayStyle={DisplayStyle.Primary}
                label={intl.formatMessage({
                  id: "view.name.phone.contacts.manualImportText",
                })}
                Icon={Type.Upload}
                onClick={handleManualImportClick}
                data-testid={SelectVendorModalTestIds.ManualImportButton}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept=".ics"
                hidden
                multiple
              />
            </>
          )}
        </ButtonWrapper>
      </ButtonsContainer>
    </Modal>
  )
}

export default SelectVendorModal
