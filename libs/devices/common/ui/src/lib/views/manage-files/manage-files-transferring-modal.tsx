/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"
import { Button, Modal, ProgressBar } from "app-theme/ui"

export interface ManageFilesTransferringModalProps {
  opened: boolean
  filesCount: number
  messages: {
    transferringModalTitle: Messages
    transferringModalCloseButtonText: Messages
  }
  progress?: number
  onCancel: VoidFunction
  progressBarMessage: string
}

export const ManageFilesTransferringModal: FunctionComponent<
  ManageFilesTransferringModalProps
> = ({
  opened,
  filesCount,
  messages,
  onCancel,
  progress = 0,
  progressBarMessage,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title
        text={formatMessage(messages.transferringModalTitle, { filesCount })}
      />
      <ProgressBar value={progress} message={progressBarMessage} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onCancel}
        >
          {formatMessage(messages.transferringModalCloseButtonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
