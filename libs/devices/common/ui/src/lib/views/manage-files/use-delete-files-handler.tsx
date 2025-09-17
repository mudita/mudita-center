/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { FileManagerFile } from "./manage-files.types"
import { ManageFilesDeleteFlowState } from "./manage-files-delete-flow.types"

interface UseDeleteFilesHandlerProps {
  selectedFiles: FileManagerFile[]
  handleDeleteFile: (fileId: string) => Promise<void>
  onDeleteSuccess?: () => Promise<void>
  onSetFlowState: (state: ManageFilesDeleteFlowState | null) => void
  onSetFailedFiles: (files: FileManagerFile[]) => void
}

export const useDeleteFilesHandler = ({
  selectedFiles,
  handleDeleteFile,
  onDeleteSuccess,
  onSetFlowState,
  onSetFailedFiles,
}: UseDeleteFilesHandlerProps) =>
  useCallback(async () => {
    const failed: FileManagerFile[] = []

    for (const file of selectedFiles) {
      if (!file) continue

      try {
        await handleDeleteFile(file.id)
      } catch {
        failed.push(file)
      }
    }

    if (failed.length > 0) {
      onSetFailedFiles(failed)
      onSetFlowState(ManageFilesDeleteFlowState.DeleteFailed)
      return
    }

    if (onDeleteSuccess) {
      await onDeleteSuccess()
    }

    onSetFlowState(null)
  }, [
    selectedFiles,
    handleDeleteFile,
    onDeleteSuccess,
    onSetFailedFiles,
    onSetFlowState,
  ])
