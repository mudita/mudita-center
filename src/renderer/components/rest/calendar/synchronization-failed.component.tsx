import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ModalContent,
  ModalText,
} from "Renderer/components/rest/calendar/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.synchronizationFailed.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.synchronizationFailed.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.synchronizationFailed.body",
  },
  button: {
    id: "common.supportButton",
  },
})

const EventsSynchronizationFailedModal: FunctionComponent<ModalProps> = (
  props
) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    actionButtonLabel={intl.formatMessage(messages.button)}
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
  </Modal>
)

export default EventsSynchronizationFailedModal
