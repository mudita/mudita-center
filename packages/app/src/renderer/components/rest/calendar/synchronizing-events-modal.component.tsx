/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.synchronizing.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.synchronizing.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.synchronizing.body",
  },
})

const SynchronizingEventsModal: FunctionComponent<ModalProps> = (...props) => (
  <Modal
    {...props}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    closeable={false}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
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

export default SynchronizingEventsModal
