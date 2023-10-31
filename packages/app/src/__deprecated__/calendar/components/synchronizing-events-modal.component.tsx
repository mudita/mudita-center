/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalContent } from "App/__deprecated__/calendar/components/calendar-modals.styled"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"

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

export default SynchronizingEventsModal
