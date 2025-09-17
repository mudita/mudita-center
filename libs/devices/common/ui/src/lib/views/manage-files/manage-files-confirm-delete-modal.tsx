/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"

export interface ManageFilesConfirmDeleteModalProps {
  opened: boolean
  onSecondaryButtonClick: VoidFunction
  onPrimaryButtonClick: VoidFunction
  onClose: VoidFunction
  fileCount: number
  messages: {
    confirmDeleteModalTitle: Messages
    confirmDeleteModalDescription: Messages
    confirmDeleteModalPrimaryButtonText: Messages
    confirmDeleteModalSecondaryButtonText: Messages
  }
}

export const ManageFilesConfirmDeleteModal: FunctionComponent<
  ManageFilesConfirmDeleteModalProps
> = ({
  opened,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  onClose,
  fileCount,
  messages,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title
        text={formatMessage(messages.confirmDeleteModalTitle, {
          fileCount,
        })}
      />
      <Typography.P1
        message={messages.confirmDeleteModalDescription.id}
        values={{ fileCount }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onSecondaryButtonClick}
        >
          {formatMessage(messages.confirmDeleteModalSecondaryButtonText, {
            fileCount,
          })}
        </Button>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onPrimaryButtonClick}
        >
          {formatMessage(messages.confirmDeleteModalPrimaryButtonText, {
            fileCount,
          })}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
