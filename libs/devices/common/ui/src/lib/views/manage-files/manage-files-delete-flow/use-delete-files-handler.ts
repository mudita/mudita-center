/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { formatMessage } from "app-localize/utils"
import { useToastContext } from "app-theme/ui"
import { FileManagerFile } from "../manage-files.types"
import { manageFilesMessages } from "../manage-files.messages"
import { createManageFilesToastContent } from "../create-manage-files-toast-content"
import { ManageFilesDeleteFlowState } from "./manage-files-delete-flow.types"

interface UseDeleteFilesHandlerProps {
  selectedFiles: FileManagerFile[]
  deleteFile: (fileId: string) => Promise<void>
  onDeleteSuccess?: () => Promise<void>
  onSetFlowState: (state: ManageFilesDeleteFlowState | null) => void
  onSetFailedFiles: (files: FileManagerFile[]) => void
}

export const useDeleteFilesHandler = ({
  selectedFiles,
  deleteFile,
  onDeleteSuccess,
  onSetFlowState,
  onSetFailedFiles,
}: UseDeleteFilesHandlerProps) => {
  const { addToast } = useToastContext()

  return useCallback(async () => {
    const failed: FileManagerFile[] = []

    for (const file of selectedFiles) {
      if (!file) continue

      try {
        await deleteFile(file.id)
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

    addToast(
      createManageFilesToastContent({
        text: formatMessage(manageFilesMessages.deleteSuccessToastText, {
          fileCount: selectedFiles.length,
        }),
      })
    )

    onSetFlowState(null)
  }, [
    addToast,
    selectedFiles,
    deleteFile,
    onDeleteSuccess,
    onSetFailedFiles,
    onSetFlowState,
  ])
}
