/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"
import { Modal } from "../modal/modal"
import { Typography } from "../typography/typography"
import { Button } from "../button/button"

export interface GenericConfirmModalProps {
  opened: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
  onClose: VoidFunction
  itemCount: number
  messages: {
    confirmDeleteModalTitle: Messages
    confirmDeleteModalDescription: Messages
    confirmDeleteModalConfirmButtonText: Messages
    confirmDeleteModalCancelButtonText: Messages
  }
}

export const GenericConfirmModal: FunctionComponent<
  GenericConfirmModalProps
> = ({ opened, onCancel, onConfirm, onClose, itemCount, messages }) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title
        text={formatMessage(messages.confirmDeleteModalTitle, {
          itemCount,
        })}
      />
      <Typography.P1
        message={messages.confirmDeleteModalDescription.id}
        values={{ itemCount }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onCancel}
        >
          {formatMessage(messages.confirmDeleteModalCancelButtonText, {
            itemCount,
          })}
        </Button>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onConfirm}
        >
          {formatMessage(messages.confirmDeleteModalConfirmButtonText, {
            itemCount,
          })}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
