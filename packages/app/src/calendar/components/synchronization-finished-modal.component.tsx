/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl, textFormatters } from "Renderer/utils/intl"
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
} from "App/calendar/components/calendar-modals.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"

const messages = defineMessages({
  title: {
    id: "module.calendar.synchronizationFinishedTitle",
  },
  subtitle: {
    id: "module.calendar.synchronizationFinishedSubtitle",
  },
  body: {
    id: "module.calendar.synchronizationFinishedBody",
  },
  button: {
    id: "component.okButton",
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
