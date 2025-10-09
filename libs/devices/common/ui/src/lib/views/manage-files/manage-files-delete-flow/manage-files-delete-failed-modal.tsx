/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { GenericFailedModal } from "app-theme/ui"
import { formatMessage, Messages } from "app-localize/utils"
import { FileManagerFile } from "../manage-files.types"

export interface ManageFilesDeleteFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  failedFiles: FileManagerFile[]
  allFiles: FileManagerFile[]
  messages: {
    deleteFailedAllModalTitle: Messages
    deleteFailedSomeModalTitle: Messages
    deleteFailedAllModalDescription: Messages
    deleteFailedDescriptionModalDescription: Messages
    deleteFailedModalCloseButtonText: Messages
  }
}

export const ManageFilesDeleteFailedModal: FunctionComponent<
  ManageFilesDeleteFailedModalProps
> = ({ opened, onClose, failedFiles, allFiles, messages }) => {
  const total = allFiles.length
  const failedCount = failedFiles.length
  const isAllFailed = total === failedCount
  const succeededCount = total - failedCount

  const title = useMemo(
    () =>
      isAllFailed
        ? formatMessage(messages.deleteFailedAllModalTitle, { failedCount })
        : formatMessage(messages.deleteFailedSomeModalTitle),
    [isAllFailed, messages, failedCount]
  )

  const description = useMemo(
    () =>
      isAllFailed
        ? formatMessage(messages.deleteFailedAllModalDescription, {
            failedCount,
          })
        : formatMessage(messages.deleteFailedDescriptionModalDescription, {
            failedCount,
            succeededCount,
          }),
    [isAllFailed, messages, failedCount, succeededCount]
  )

  const failedFilesList = total > 1 && !isAllFailed ? failedFiles : undefined

  return (
    <GenericFailedModal
      opened={opened}
      onClose={onClose}
      title={title}
      description={description}
      buttonText={formatMessage(messages.deleteFailedModalCloseButtonText)}
      failedItems={failedFilesList}
    />
  )
}
