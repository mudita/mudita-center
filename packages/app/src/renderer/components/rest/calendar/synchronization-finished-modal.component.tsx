import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl, textFormatters } from "Renderer/utils/intl"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import { defineMessages } from "react-intl"
import {
  ModalContent,
  ModalText,
} from "Renderer/components/rest/calendar/calendar-modals.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.synchronizationFinished.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.synchronizationFinished.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.synchronizationFinished.body",
  },
  button: {
    id: "view.generic.button.ok",
  },
})

interface EventsSynchronizationFinishedModalProps extends ModalProps {
  importedEventsCount?: number
}

const EventsSynchronizationFinishedModal: FunctionComponent<EventsSynchronizationFinishedModalProps> = ({
  importedEventsCount,
  ...props
}) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    actionButtonLabel={intl.formatMessage(messages.button)}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.ThinCheck} width={8} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={{
          ...messages.body,
          values: {
            importedEventsCount,
            ...textFormatters,
          },
        }}
      />
    </ModalContent>
  </Modal>
)

export default EventsSynchronizationFinishedModal
