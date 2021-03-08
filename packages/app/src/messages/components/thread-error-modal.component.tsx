/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
import React from "react"
import { ThreadErrorModalTestIds } from "App/messages/components/thread-error-modal-test-ids.enum"

const messages = defineMessages({
  title: {
    id: "view.name.messages.modal.loadingThreadError.title",
  },
  subtitle: {
    id: "view.name.messages.modal.loadingThreadError.body",
  },
})

const ThreadErrorModal: FunctionComponent<ModalProps> = ({ ...props }) => (
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
        data-testid={ThreadErrorModalTestIds.Body}
      />
    </ModalContent>
  </Modal>
)

export default ThreadErrorModal
