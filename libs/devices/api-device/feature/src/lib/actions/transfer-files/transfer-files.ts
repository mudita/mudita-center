/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { ApiDevice } from "devices/api-device/models"
import {
  ExecuteTransferResult,
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFileEntry,
  TransferFilesParams,
  TransferMode,
} from "devices/common/models"
import { createTransferProgressTracker } from "./create-transfer-files-progress"
import { executeTransfer } from "./execute-transfer"
import { createMtpWatcher, MtpWatcherFactory } from "./mtp-watcher"
import { ApiDeviceMTPTransferErrorName } from "./transfer-files.types"

export const transferFiles = async (
  params: TransferFilesParams<ApiDevice>,
  mtpWatcherFactory: MtpWatcherFactory = createMtpWatcher
): Promise<ExecuteTransferResult<{ trackedModes: TransferMode[] }>> => {
  const externalAbortController = params.abortController
  const autoSwitchMTPMax = Math.max(0, params.autoSwitchMTPMax ?? 1)

  const { reportProgress, finalizeProgress } = createTransferProgressTracker({
    onProgress: params.onProgress,
  })

  let mtpEntries = 0
  let activeTransferMode = params.transferMode ?? TransferMode.Mtp
  let pendingFiles: TransferFileEntry[] = params.files
  let internalAbortController = new AbortController()
  let mtpWatcherAbortTriggered = false
  let processedFailedFiles: FailedTransferItem[] = []

  const trackedModes: TransferMode[] = [activeTransferMode]

  if (externalAbortController) {
    externalAbortController.signal.addEventListener("abort", () => {
      internalAbortController.abort()
    })
  }

  const mtpWatcher = mtpWatcherFactory({
    device: params.device,
    onReconnect: () => {
      mtpWatcherAbortTriggered = true
      internalAbortController.abort()
    },
  })

  if (activeTransferMode === TransferMode.Serial) {
    mtpWatcher.start()
  }

  try {
    while (true) {
      const result = await executeTransfer(
        { ...params, abortController: internalAbortController },
        activeTransferMode,
        pendingFiles,
        reportProgress
      )

      const executedFailedFiles: FailedTransferItem[] =
        result.data?.failed ?? []
      const failed = [...processedFailedFiles, ...executedFailedFiles]
      const isMtpInitError =
        !result.ok &&
        result.error.name ===
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError

      // 1. All executed files in this iteration transferred successfully
      if (executedFailedFiles.length === 0) {
        finalizeProgress()
        return buildResultFromFailed(
          params.files,
          processedFailedFiles,
          trackedModes,
          result
        )
      }

      // 2. File transfer failed or transfer aborted by user
      if (!mtpWatcherAbortTriggered && !isMtpInitError) {
        finalizeProgress()
        return buildResultFromFailed(params.files, failed, trackedModes, result)
      }

      const switchableFiles = filterSwitchableFiles(
        pendingFiles,
        executedFailedFiles
      )

      // 3. File transfer completed but some files failed and none are switchable
      if (!switchableFiles) {
        finalizeProgress()
        return buildResultFromFailed(params.files, failed, trackedModes, result)
      }

      // 4. Some files failed and are switchable - switch transfer mode and retry
      mtpWatcherAbortTriggered = false
      internalAbortController = new AbortController()

      if (externalAbortController?.signal.aborted) {
        internalAbortController.abort()
      }

      const { nextMode, mtpEntries: nextMtpEntries } = chooseNextMode(
        activeTransferMode,
        mtpEntries,
        autoSwitchMTPMax
      )

      if (nextMode === TransferMode.Serial) {
        mtpWatcher.start()
      } else {
        mtpWatcher.stop()
      }

      if (nextMode !== activeTransferMode) {
        trackedModes.push(nextMode)
        params.onModeChange?.(nextMode)
      }

      activeTransferMode = nextMode
      mtpEntries = nextMtpEntries
      pendingFiles = switchableFiles
      processedFailedFiles = [
        ...processedFailedFiles,
        ...executedFailedFiles.filter((fail) => {
          return !switchableFiles.some((file) => file.id === fail.id)
        }),
      ]
    }
  } catch (error: unknown) {
    console.warn("File transfer failed", error)

    const failed = [
      ...processedFailedFiles,
      ...pendingFiles.map((file) => ({
        id: file.id,
        errorName: FailedTransferErrorName.Unknown,
      })),
    ]

    finalizeProgress()
    return buildResultFromFailed(params.files, failed, trackedModes)
  } finally {
    mtpWatcher.stop()
  }
}

function filterSwitchableFiles(
  files: TransferFileEntry[],
  failed: FailedTransferItem[] = []
): TransferFileEntry[] | null {
  const switchableFiles = failed.filter((x) => {
    return (
      x.errorName === FailedTransferErrorName.Aborted ||
      x.errorName === ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  })
  if (switchableFiles.length === 0) {
    return null
  }

  return files.filter((file) =>
    switchableFiles.some((fail) => fail.id === file.id)
  )
}

function chooseNextMode(
  currentMode: TransferMode,
  mtpEntries: number,
  autoSwitchMTPMax: number
): { nextMode: TransferMode; mtpEntries: number } {
  if (currentMode === TransferMode.Mtp) {
    return { nextMode: TransferMode.Serial, mtpEntries }
  }

  if (mtpEntries < autoSwitchMTPMax) {
    return {
      nextMode: TransferMode.Mtp,
      mtpEntries: mtpEntries + 1,
    }
  }

  return { nextMode: TransferMode.Serial, mtpEntries }
}

const buildResultFromFailed = (
  allFiles: TransferFileEntry[],
  failed: FailedTransferItem[],
  trackedModes: TransferMode[],
  result?: AppResult
): ExecuteTransferResult<{ trackedModes: TransferMode[] }> => {
  const allFailed = failed.length === allFiles.length
  const data = result?.data
    ? {
        ...result.data,
        trackedModes,
      }
    : { trackedModes }

  if (failed.length === 0) {
    return AppResultFactory.success(data)
  }

  if (!allFailed) {
    return AppResultFactory.success({ ...data, failed })
  }

  return AppResultFactory.failed(
    !result?.ok && result?.error
      ? result.error
      : new AppError("", FailedTransferErrorName.Unknown),
    { failed, trackedModes }
  )
}
