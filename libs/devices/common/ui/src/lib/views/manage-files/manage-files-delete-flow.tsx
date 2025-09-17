/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { delayUntil } from "app-utils/common"
import { FileManagerFile } from "./manage-files.types"
import { ManageFilesDeletingModal } from "./manage-files-deleting-modal"
import {
  ManageFilesConfirmDeleteModal,
  ManageFilesConfirmDeleteModalProps,
} from "./manage-files-confirm-delete-modal"
import {
  ManageFilesDeleteFailedModal,
  ManageFilesDeleteFailedModalProps,
} from "./manage-files-delete-failed-modal"
import { useDeleteFilesHandler } from "./use-delete-files-handler"
import { ManageFilesDeleteFlowState } from "./manage-files-delete-flow.types"

type ManageFilesDeleteFlowMessages =
  ManageFilesConfirmDeleteModalProps["messages"] &
    ManageFilesDeleteFailedModalProps["messages"]

export interface ManageFilesDeleteFlowProps {
  opened: boolean
  selectedFiles: FileManagerFile[]
  onClose: VoidFunction
  handleDeleteFile: (fileId: string) => Promise<void>
  onDeleteSuccess?: () => Promise<void>
  onPartialDeleteFailure?: (failedFiles: FileManagerFile[]) => Promise<void>
  deleteFlowMessages: ManageFilesDeleteFlowMessages
}

export const ManageFilesDeleteFlow: FunctionComponent<
  ManageFilesDeleteFlowProps
> = ({
  opened,
  onClose,
  selectedFiles,
  handleDeleteFile,
  onDeleteSuccess,
  onPartialDeleteFailure,
  deleteFlowMessages,
}) => {
  const [flowState, setFlowState] = useState<ManageFilesDeleteFlowState | null>(
    opened ? ManageFilesDeleteFlowState.ConfirmDelete : null
  )
  const [failedFiles, setFailedFiles] = useState<FileManagerFile[]>([])

  useEffect(() => {
    setFlowState(opened ? ManageFilesDeleteFlowState.ConfirmDelete : null)
  }, [opened])

  const handleDeleteFiles = useDeleteFilesHandler({
    selectedFiles,
    handleDeleteFile,
    onDeleteSuccess,
    onSetFlowState: setFlowState,
    onSetFailedFiles: setFailedFiles,
  })

  const handleConfirmDeleteClick = useCallback(() => {
    setFlowState(ManageFilesDeleteFlowState.Deleting)
    void delayUntil(handleDeleteFiles(), 500)
  }, [handleDeleteFiles])

  const handleDeleteFailedClose = useCallback(async () => {
    onPartialDeleteFailure && (await onPartialDeleteFailure(failedFiles))
    setFlowState(null)
  }, [failedFiles, onPartialDeleteFailure])

  return (
    <>
      <ManageFilesConfirmDeleteModal
        opened={flowState === ManageFilesDeleteFlowState.ConfirmDelete}
        onClose={onClose}
        onPrimaryButtonClick={handleConfirmDeleteClick}
        onSecondaryButtonClick={onClose}
        selectedItems={selectedFiles.length}
        messages={deleteFlowMessages}
      />
      <ManageFilesDeletingModal
        opened={flowState === ManageFilesDeleteFlowState.Deleting}
      />
      <ManageFilesDeleteFailedModal
        opened={flowState === ManageFilesDeleteFlowState.DeleteFailed}
        onClose={handleDeleteFailedClose}
        messages={deleteFlowMessages}
        failedFiles={failedFiles}
        allFiles={selectedFiles}
      />
    </>
  )
}
