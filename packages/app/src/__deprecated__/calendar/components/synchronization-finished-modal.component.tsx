/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import React from "react"
import { defineMessages } from "react-intl"
import {
  ModalContent,
  ModalText,
} from "App/__deprecated__/calendar/components/calendar-modals.styled"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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

const EventsSynchronizationFinishedModal: FunctionComponent<
  EventsSynchronizationFinishedModalProps
> = ({ importedEventsCount, ...props }) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    actionButtonLabel={intl.formatMessage(messages.button)}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={IconType.ThinCheck} width={8} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
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
