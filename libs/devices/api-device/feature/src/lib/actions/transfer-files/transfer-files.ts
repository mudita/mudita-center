/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResultFactory } from "app-utils/models"
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
): Promise<ExecuteTransferResult> => {
  const autoSwitchMTPMax = Math.max(0, params.autoSwitchMTPMax ?? 1)

  const { reportProgress, finalizeProgress } = createTransferProgressTracker({
    onProgress: params.onProgress,
  })

  let mtpEntries = 0
  let activeTransferMode = params.transferMode ?? TransferMode.Mtp
  let pendingFiles: TransferFileEntry[] = params.files
  let mtpWatcherAbortTriggered = false

  const mtpWatcher = mtpWatcherFactory({
    onReconnect: () => {
      mtpWatcherAbortTriggered = true
      params.abortController?.abort()
    },
  })

  if (activeTransferMode === TransferMode.Serial) {
    mtpWatcher.start()
  }

  try {
    while (true) {
      const result = await executeTransfer(
        params,
        activeTransferMode,
        pendingFiles,
        reportProgress
      )

      if (result.ok) {
        finalizeProgress()
        return result
      }

      if (
        result.error.name === FailedTransferErrorName.Aborted &&
        !mtpWatcherAbortTriggered
      ) {
        return result
      }

      if (
        (result.error.name === FailedTransferErrorName.Aborted &&
          mtpWatcherAbortTriggered) ||
        result.error.name ===
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
      ) {
        const switchableFiles = filterSwitchableFiles(
          pendingFiles,
          result.data?.failed
        )

        if (!switchableFiles) {
          finalizeProgress()
          return AppResultFactory.failed(
            new AppError("", FailedTransferErrorName.Unknown),
            result.data
          )
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
          params.onModeChange?.(nextMode)
        }

        activeTransferMode = nextMode
        mtpEntries = nextMtpEntries
        pendingFiles = switchableFiles
        continue
      }

      return result
    }
  } catch (error: unknown) {
    console.warn("File transfer failed", error)

    const failed = pendingFiles.map((file) => ({
      id: file.id,
      errorName: FailedTransferErrorName.Unknown,
    }))

    const isOK = params.files.length !== failed.length

    return isOK
      ? AppResultFactory.success({
          failed,
        })
      : AppResultFactory.failed(
          new AppError("", FailedTransferErrorName.Unknown),
          {
            failed,
          }
        )
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
