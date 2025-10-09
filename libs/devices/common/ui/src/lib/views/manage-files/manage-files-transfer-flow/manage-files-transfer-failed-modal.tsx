/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { GenericFailedModal } from "app-theme/ui"
import { FileManagerFile } from "../manage-files.types"
import {
  FileTransferFailed,
  getTransferFailedModalContent,
  ManageFilesTransferFailedModalMessages,
  mapFailedFilesWithLabels,
} from "./manage-files-transfer-failed.copy"

export interface ManageFilesTransferFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  failedFiles: FileTransferFailed[]
  allFiles: FileManagerFile[]
  messages: ManageFilesTransferFailedModalMessages
}

export const ManageFilesTransferFailedModal: FunctionComponent<
  ManageFilesTransferFailedModalProps
> = ({ opened, messages, failedFiles, allFiles, onClose }) => {
  const { title, description, onlySingleReason } =
    getTransferFailedModalContent({
      failedFiles,
      total: allFiles.length,
      messages,
    })

  const failedFilesList =
    allFiles.length > 1 && !onlySingleReason
      ? mapFailedFilesWithLabels(failedFiles, messages)
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
