/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { GenericFailedModal } from "app-theme/ui"
import {
  FailedTransferItem,
  TransferFilesActionType,
} from "devices/common/models"
import { FileManagerFile } from "../manage-files.types"
import {
  getTransferFailedModalContent,
  ManageFilesTransferFailedModalMessages,
  mapFailedFilesWithLabels,
} from "./manage-files-transfer-failed.copy"

export interface ManageFilesTransferFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  failedFiles: FailedTransferItem[]
  allFiles: FileManagerFile[]
  messages: ManageFilesTransferFailedModalMessages
  actionType: TransferFilesActionType
}

export const ManageFilesTransferFailedModal: FunctionComponent<
  ManageFilesTransferFailedModalProps
> = ({ opened, messages, failedFiles, allFiles, onClose, actionType }) => {
  const { title, description, onlySingleReason } =
    getTransferFailedModalContent({
      failedFiles,
      total: allFiles.length,
      messages,
      actionType,
    })

  const failedFilesList =
    allFiles.length > 1 && !onlySingleReason
      ? mapFailedFilesWithLabels(allFiles, failedFiles, messages, actionType)
      : undefined

  return (
    <GenericFailedModal
      opened={opened}
      onClose={onClose}
      title={title}
      description={description}
      buttonText={formatMessage(messages.uploadFailedModalCloseButtonText)}
      failedItems={failedFilesList}
    />
  )
}
