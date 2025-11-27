/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { GenericProgressModal } from "app-theme/ui"
import { formatMessage, Messages } from "app-localize/utils"
import { ManageFilesTransferProgressWarning } from "./manage-files-transfer-progress-warning"

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
  progressWarningVisible: boolean
}

export const ManageFilesTransferProgressModal: FunctionComponent<
  ManageFilesTransferringModalProps
> = ({
  opened,
  filesCount,
  messages,
  onCancel,
  progress = 0,
  progressBarMessage,
  progressWarningVisible,
}) => {
  return (
    <GenericProgressModal
      opened={opened}
      title={formatMessage(messages.transferringModalTitle, { filesCount })}
      progress={progress}
      progressBarMessage={progressBarMessage}
      onCancel={onCancel}
      closeButtonText={formatMessage(messages.transferringModalCloseButtonText)}
    >
      {progressWarningVisible && <ManageFilesTransferProgressWarning />}
    </GenericProgressModal>
  )
}
