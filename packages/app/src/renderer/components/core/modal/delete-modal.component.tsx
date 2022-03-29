/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Message } from "Renderer/interfaces/message.interface"
import { DeleteModalTestIds } from "Renderer/components/core/modal/delete-modal.enum"
import { IconType } from "Renderer/components/core/icon/icon-type"

export const ModalContent = styled.div`
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
  cancelButton: { id: "module.contacts.deleteCancelButton" },
  deleteButton: { id: "module.contacts.deleteButton" },
})

export interface DeleteContactModalProps {
  onDelete?: () => void
  onClose?: () => void
  deleting?: boolean
  title?: string
  message?: Message
}

const DeleteModal: FunctionComponent<DeleteContactModalProps> = ({
  onDelete = noop,
  onClose = noop,
  title,
  message,
  ...rest
}) => {
  return (
    <Modal
      title={title}
      size={ModalSize.Small}
      onActionButtonClick={onDelete}
      actionButtonLabel={intl.formatMessage(messages.deleteButton)}
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      data-testid={DeleteModalTestIds.Wrapper}
      {...rest}
    >
      <ModalContent data-testid={DeleteModalTestIds.Content}>
        <Icon type={IconType.DeleteBig} width={12} height={12} />
        <Text displayStyle={TextDisplayStyle.Paragraph2} message={message} />
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
