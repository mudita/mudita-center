/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ModalContent,
  ModalText,
} from "App/calendar/components/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"

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
