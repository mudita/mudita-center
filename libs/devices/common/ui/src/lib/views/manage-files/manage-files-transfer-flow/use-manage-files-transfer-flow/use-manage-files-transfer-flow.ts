/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useRef, useState } from "react"
import { sum } from "lodash"
import {
  ExecuteTransferResult,
  FailedTransferItem,
  TransferFilesActionType,
  TransferMode,
} from "devices/common/models"
import {
  FileManagerFile,
  FileTransferWithValidation,
} from "../../manage-files.types"

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
  actionType: TransferFilesActionType
}

export const useManageFilesTransferFlow = ({
  transferFiles,
  actionType,
}: UseManageFilesTransferFlowArgs): {
  transfer: (files: FileTransferWithValidation[]) => Promise<{
    failed: FailedTransferItem[]
  }>
  abortTransfer: () => void
  progress: number
  currentFile: FileManagerFile | null
} => {
  const [progress, setProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState<FileManagerFile | null>(null)

  const abortControllerRef = useRef(new AbortController())

  const abortTransfer = useCallback(() => {
    abortControllerRef.current.abort()
  }, [])

  const transfer = useCallback(
    async (files: FileTransferWithValidation[]) => {
      setProgress(0)
      setCurrentFile(null)
      abortControllerRef.current = new AbortController()

      const noValidFileTransfers: FailedTransferItem[] = files
        .filter((file) => !!file.validationErrorName)
        .map((file) => ({ ...file, errorName: file.validationErrorName! }))

      const validFiles = files.filter((file) => !file.validationErrorName)
      const totalBytesToUpload = sum(validFiles.map((f) => f.size))

      if (totalBytesToUpload === 0) {
        return { failed: noValidFileTransfers }
      }

      const result = await transferFiles({
        actionType,
        files: validFiles,
        abortController: abortControllerRef.current,
        onProgress: ({ progress, file }) => {
          setProgress(progress)
          file && setCurrentFile(file)
        },
      })

      if (result.data?.failed) {
        const failed: FailedTransferItem[] = result.data.failed
          .map(({ errorName, id }) => {
            const originalFile = validFiles.find((file) => file.id === id)

            if (!originalFile) return null

            return {
              ...originalFile,
              errorName,
            } as FailedTransferItem
          })
          .filter((f): f is FailedTransferItem => f !== null)

        return { failed: [...noValidFileTransfers, ...failed] }
      }

      return { failed: noValidFileTransfers }
    },
    [transferFiles]
  )

  return { transfer, abortTransfer, progress, currentFile }
}
