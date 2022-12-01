/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { defineMessages } from "react-intl"
import { ModalContent } from "App/__deprecated__/calendar/components/calendar-modals.styled"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import React from "react"
import { ExportErrorModalTestIds } from "App/__deprecated__/calendar/components/export-error-modal/export-error-modal-test-ids.enum"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.calendar.exportFailedTitle",
  },
  subtitle: {
    id: "module.calendar.exportFailedSubtitle",
  },
  body: {
    id: "module.calendar.exportFailedBody",
  },
})

const ExportErrorModal: FunctionComponent<ModalProps> = ({ ...props }) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={IconType.CalendarIcon} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.subtitle}
        data-testid={ExportErrorModalTestIds.Subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.body}
        data-testid={ExportErrorModalTestIds.Body}
      />
    </ModalContent>
  </Modal>
)

export default ExportErrorModal
