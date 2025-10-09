/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import { GenericFailedModal } from "app-theme/ui"
import {
  AvailableSpaceInfo,
  FileManagerFile,
  ValidationSummary,
  ValidationSummaryType,
} from "../manage-files.types"

export interface ManageFilesTransferValidationFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  selectedFiles: FileManagerFile[]
  validationSummary?: ValidationSummary
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
> = ({ opened, selectedFiles, validationSummary, onClose, messages }) => {
  const filesCount = selectedFiles.length

  const title = formatMessage(messages.uploadValidationFailureModalTitle, {
    filesCount,
  })

  const description = useMemo(() => {
    if (validationSummary === undefined) {
      return ""
    }

    switch (validationSummary.type) {
      case ValidationSummaryType.AllFilesDuplicated:
        return formatMessage(
          messages.uploadValidationFailureDuplicatesDescription,
          { filesCount }
        )
      case ValidationSummaryType.NotHaveSpaceForUpload:
        return formatMessage(
          messages.uploadValidationFailureInsufficientMemoryDescription,
          {
            value: (validationSummary.values as AvailableSpaceInfo)
              .formattedDifference,
            filesCount,
          }
        )
      case ValidationSummaryType.AllFilesTooLarge:
        return formatMessage(
          messages.uploadValidationFailureFileTooLargeDescription
        )
      default:
        return ""
    }
  }, [
    validationSummary,
    filesCount,
    messages.uploadValidationFailureDuplicatesDescription,
    messages.uploadValidationFailureFileTooLargeDescription,
    messages.uploadValidationFailureInsufficientMemoryDescription,
  ])

  return (
    <GenericFailedModal
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
