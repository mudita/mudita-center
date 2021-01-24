import React from "react"
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
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ButtonContainer,
  ButtonWrapper,
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ModalContent,
  WideButton,
} from "Renderer/components/rest/calendar/calendar-modals.styled"

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
}

const SelectVendorModal: FunctionComponent<SelectVendorModalProps> = ({
  onGoogleButtonClick,
  ...props
}) => (
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
    <ButtonContainer buttonsPosition={ModalSize.Small}>
      <ButtonWrapper>
        <WideButton
          labelMessage={messages.button}
          onClick={onGoogleButtonClick}
          Icon={Type.Google}
          data-testid={"google-button"}
        />
      </ButtonWrapper>
    </ButtonContainer>
  </Modal>
)

export default SelectVendorModal
