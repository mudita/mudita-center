/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import {
  ModalContent,
  ModalText,
} from "App/__deprecated__/calendar/components/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.calendar.synchronizationFailedTitle",
  },
  subtitle: {
    id: "module.calendar.synchronizationFailedSubtitle",
  },
  body: {
    id: "module.calendar.synchronizationFailedBody",
  },
  button: {
    id: "component.supportButton",
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
        <Icon type={IconType.CalendarIcon} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        message={messages.body}
      />
    </ModalContent>
  </Modal>
)

export default EventsSynchronizationFailedModal
