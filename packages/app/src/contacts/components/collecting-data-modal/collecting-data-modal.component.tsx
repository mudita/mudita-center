/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import Modal from "Renderer/components/core/modal/modal.component"
import { intl } from "Renderer/utils/intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CollectingDataModalTestIds } from "App/contacts/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import {
  ModalContent,
  Paragraph,
} from "App/contacts/components/collecting-data-modal/collecting-data-modal.styled"

const messages = defineMessages({
  title: { id: "app.collecting.data.modal.title" },
  text: { id: "app.collecting.data.modal.text" },
  body: { id: "app.collecting.data.modal.body" },
  cancelButton: { id: "app.collecting.data.modal.cancel" },
  agreeButton: { id: "app.collecting.data.modal.agree" },
})

interface Props {
  close: () => void
  agree: () => void
}

const CollectingDataModal: FunctionComponent<Props> = ({ agree, close }) => {
  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      onActionButtonClick={agree}
      actionButtonLabel={intl.formatMessage(messages.agreeButton)}
      onClose={close}
      onCloseButton={close}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <ModalContent>
        <Icon type={Type.MuditaLogoBg} width={12} height={12} />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Subtitle}
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.text}
        />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Body}
          displayStyle={TextDisplayStyle.MediumText}
          message={messages.body}
        />
      </ModalContent>
    </Modal>
  )
}

export default CollectingDataModal
