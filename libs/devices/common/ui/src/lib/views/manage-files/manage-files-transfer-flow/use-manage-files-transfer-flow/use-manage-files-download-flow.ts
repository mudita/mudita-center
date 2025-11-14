/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useRef, useState } from "react"
import {
  ExecuteTransferResult,
  FailedTransferItem,
  TransferFilesActionType,
  TransferMode,
} from "devices/common/models"
import { FileManagerFile } from "../../manage-files.types"

export interface UseManageFilesTransferFlowArgs {
  transferFiles: (params: {
    actionType: TransferFilesActionType
    files: FileManagerFile[]
    onProgress?: (progress: {
      progress: number
      file?: FileManagerFile
    }) => void
    onModeChange?: (mode: TransferMode) => void
    abortController: AbortController
  }) => Promise<ExecuteTransferResult>
}

export const useManageFilesDownloadFlow = ({
  transferFiles,
}: UseManageFilesTransferFlowArgs): {
  transfer: (files: FileManagerFile[]) => Promise<{
    failed: FailedTransferItem[]
  }>
  abortTransfer: () => void
  progress: number
  transferMode: TransferMode
  currentFile: FileManagerFile | null
} => {
  const [progress, setProgress] = useState(0)
  const [transferMode, setTransferMode] = useState<TransferMode>(
    TransferMode.Mtp
  )
  const [currentFile, setCurrentFile] = useState<FileManagerFile | null>(null)

  const abortControllerRef = useRef(new AbortController())

  const abortTransfer = useCallback(() => {
    abortControllerRef.current.abort()
  }, [])

  const transfer = useCallback(
    async (files: FileManagerFile[]) => {
      setProgress(0)
      setCurrentFile(null)
      abortControllerRef.current = new AbortController()

      const result = await transferFiles({
        actionType: TransferFilesActionType.Download,
        files,
        abortController: abortControllerRef.current,
        onProgress: ({ progress, file }) => {
          setProgress(progress)
          file && setCurrentFile(file)
        },
        onModeChange: (mode: TransferMode) => {
          setTransferMode(mode)
        },
      })

      if (result.data?.failed) {
        const failed: FailedTransferItem[] = result.data.failed
          .map(({ errorName, id }) => {
            const originalFile = files.find((file) => file.id === id)

            if (!originalFile) return null

            return {
              ...originalFile,
              errorName,
            } as FailedTransferItem
          })
          .filter((f): f is FailedTransferItem => f !== null)

        return { failed }
      }

      return { failed: [] }
    },
    [transferFiles]
  )

  return { transfer, abortTransfer, progress, currentFile, transferMode }
}
