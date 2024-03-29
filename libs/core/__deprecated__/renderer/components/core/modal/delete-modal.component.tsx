/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Modal from "Core/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { Message } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { DeleteModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/delete-modal.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import {
  ModalContent,
  TextMessage,
} from "Core/__deprecated__/renderer/components/core/modal/delete-modal.styled"

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
        <TextMessage
          displayStyle={TextDisplayStyle.Paragraph2}
          message={message}
        />
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
