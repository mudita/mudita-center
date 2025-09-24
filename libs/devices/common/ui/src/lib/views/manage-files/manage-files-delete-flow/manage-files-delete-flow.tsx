/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { delayUntil } from "app-utils/common"
import { FileManagerFile } from "../manage-files.types"
import { ManageFilesDeleteProgressModal } from "./manage-files-delete-progress-modal"
import {
  ManageFilesConfirmDeleteModalProps,
  ManageFilesDeleteConfirmModal,
} from "./manage-files-delete-confirm-modal"
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
  deleteFile: (fileId: string) => Promise<void>
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
  deleteFile,
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

  const deleteFiles = useDeleteFilesHandler({
    selectedFiles,
    deleteFile,
    onDeleteSuccess,
    onSetFlowState: setFlowState,
    onSetFailedFiles: setFailedFiles,
  })

  const confirmDelete = useCallback(() => {
    setFlowState(ManageFilesDeleteFlowState.Deleting)
    void delayUntil(deleteFiles(), 500)
  }, [deleteFiles])

  const closeDeleteFailedModal = useCallback(async () => {
    onPartialDeleteFailure && (await onPartialDeleteFailure(failedFiles))
    setFlowState(null)
  }, [failedFiles, onPartialDeleteFailure])

  return (
    <>
      <ManageFilesDeleteConfirmModal
        opened={flowState === ManageFilesDeleteFlowState.ConfirmDelete}
        onClose={onClose}
        onConfirm={confirmDelete}
        onCancel={onClose}
        fileCount={selectedFiles.length}
        messages={deleteFlowMessages}
      />
      <ManageFilesDeleteProgressModal
        opened={flowState === ManageFilesDeleteFlowState.Deleting}
      />
      <ManageFilesDeleteFailedModal
        opened={flowState === ManageFilesDeleteFlowState.DeleteFailed}
        onClose={closeDeleteFailedModal}
        messages={deleteFlowMessages}
        failedFiles={failedFiles}
        allFiles={selectedFiles}
      />
    </>
  )
}
