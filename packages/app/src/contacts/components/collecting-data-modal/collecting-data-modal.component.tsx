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
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    white-space: pre-wrap;
    text-align: center;
    line-height: 2.2rem;
    margin-top: 3.2rem;
  }
`

const messages = defineMessages({
  title: { id: "app.collecting.data.modal.title" },
  text: { id: "app.collecting.data.modal.text" },
  body: { id: "app.collecting.data.modal.body" },
  cancelButton: { id: "app.collecting.data.modal.cancel" },
  agreeButton: { id: "app.collecting.data.modal.agree" },
})

interface Props {
  onClose: () => void
  onAgree: () => void
}

const CollectingDataModal: FunctionComponent<Props> = ({
  onAgree,
  onClose,
}) => {
  return (
    <Modal
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      onActionButtonClick={onAgree}
      actionButtonLabel={intl.formatMessage(messages.agreeButton)}
      onClose={onClose}
      onCloseButton={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <ModalContent>
        <Icon type={Type.MuditaLogoBg} width={12} height={12} />
        <Text
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.text}
        />
        <Text
          displayStyle={TextDisplayStyle.MediumText}
          message={messages.body}
        />
      </ModalContent>
    </Modal>
  )
}

export default CollectingDataModal
