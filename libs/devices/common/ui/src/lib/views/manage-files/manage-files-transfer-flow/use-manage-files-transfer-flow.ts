/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useRef, useState } from "react"
import { sum } from "lodash"
import {
  FileManagerFile,
  FileTransferResult,
  FileTransferWithValidation,
  TransferErrorName,
} from "../manage-files.types"
import { FileTransferFailed } from "./manage-files-transfer-failed.copy"

export interface UseManageFilesTransferFlowArgs {
  transferFile: (params: {
    file: FileManagerFile
    onProgress?: (progress: { loaded: number }) => void
    abortController: AbortController
  }) => Promise<FileTransferResult>
}

export const useManageFilesTransferFlow = ({
  transferFile,
}: UseManageFilesTransferFlowArgs) => {
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
      const failed: FileTransferFailed[] = []
      const totalFilesSizes = files
        .filter((f) => !f.validationErrorName)
        .map((f) => f.size)

      const uploadedFilesSizes: Record<string, number> = {}

      for (const file of files) {
        if (file.validationErrorName) {
          failed.push({
            ...file,
            errorName: file.validationErrorName,
          })
          continue
        }

        if (abortControllerRef.current.signal.aborted) {
          failed.push({
            ...file,
            errorName: TransferErrorName.Cancelled,
          })
          continue
        }
        setCurrentFile(file)
        const transferResult = await transferFile({
          file,
          abortController: abortControllerRef.current,
          onProgress: (progress) => {
            uploadedFilesSizes[file.id] = progress.loaded
            setProgress(
              Math.floor(
                (sum(Object.values(uploadedFilesSizes)) /
                  sum(totalFilesSizes)) *
                  100
              )
            )
          },
        })

        if (
          !transferResult.ok &&
          transferResult.error.name !== TransferErrorName.Cancelled
        ) {
          failed.push({
            ...file,
            errorName: transferResult.error.name,
            values: transferResult.data,
          })
        }

        if (
          !transferResult.ok &&
          transferResult.error.name === TransferErrorName.Cancelled
        ) {
          failed.push({
            ...file,
            errorName: TransferErrorName.Cancelled,
          })
        }
      }

      return { failed }
    },
    [transferFile]
  )

  return { transfer, abortTransfer, progress, currentFile }
}
