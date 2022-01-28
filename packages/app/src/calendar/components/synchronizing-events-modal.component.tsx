/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalContent } from "App/calendar/components/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"

const messages = defineMessages({
  title: {
    id: "module.calendar.synchronizingTitle",
  },
  subtitle: {
    id: "module.calendar.synchronizingSubtitle",
  },
  body: {
    id: "module.calendar.synchronizingBody",
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
        displayStyle={TextDisplayStyle.QuaternaryHeading}
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
