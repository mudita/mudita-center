/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import {
  AvailableSpaceInfo,
  FileManagerFile,
  FileTransferValidationResult,
  ValidationErrorName,
} from "./manage-files.types"
import { ManageFilesFailedModal } from "./manage-files-failed-modal"

export interface ManageFilesTransferValidationFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  selectedFiles: FileManagerFile[]
  result?: FileTransferValidationResult
  messages: {
    uploadValidationFailureModalTitle: Messages
    uploadValidationFailureDuplicatesDescription: Messages
    uploadValidationFailureInsufficientMemoryDescription: Messages
    uploadValidationFailureFileTooLargeDescription: Messages
    uploadValidationFailureModalCloseButtonText: Messages
  }
}

export const ManageFilesTransferValidationFailedModal: FunctionComponent<
  ManageFilesTransferValidationFailedModalProps
> = ({ opened, selectedFiles, result, onClose, messages }) => {
  const filesCount = selectedFiles.length

  const title = formatMessage(messages.uploadValidationFailureModalTitle, {
    filesCount,
  })

  const description = useMemo(() => {
    if (result === undefined || result.ok) {
      return ""
    }

    switch (result.error.name) {
      case ValidationErrorName.AllFilesDuplicated:
        return formatMessage(
          messages.uploadValidationFailureDuplicatesDescription,
          { filesCount }
        )
      case ValidationErrorName.NotHaveSpaceForUpload:
        return formatMessage(
          messages.uploadValidationFailureInsufficientMemoryDescription,
          {
            value: (result.data as AvailableSpaceInfo).formattedDifference,
            filesCount,
          }
        )
      case ValidationErrorName.SomeFileLargerThan2GB:
        return formatMessage(
          messages.uploadValidationFailureFileTooLargeDescription
        )
      default:
        return ""
    }
  }, [
    result,
    filesCount,
    messages.uploadValidationFailureDuplicatesDescription,
    messages.uploadValidationFailureFileTooLargeDescription,
    messages.uploadValidationFailureInsufficientMemoryDescription,
  ])

  return (
    <ManageFilesFailedModal
      opened={opened}
      onClose={onClose}
      title={title}
      description={description}
      buttonText={formatMessage(
        messages.uploadValidationFailureModalCloseButtonText
      )}
    />
  )
}
