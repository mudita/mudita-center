import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { defineMessages } from "react-intl"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import React from "react"
import { ExportErrorModalTestIds } from "App/calendar/components/export-error-modal/export-error-modal-test-ids.enum"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.exportFailed.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.exportFailed.subtitle"
  },
  body: {
    id: "view.name.calendar.modal.exportFailed.body",
  },
})

const ExportErrorModal: FunctionComponent<ModalProps> = ({
  ...props
}) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.CalendarIcon} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.subtitle}
        data-testid={ExportErrorModalTestIds.Subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.body}
        data-testid={ExportErrorModalTestIds.Body}
      />
    </ModalContent>
  </Modal>
)

export default ExportErrorModal
