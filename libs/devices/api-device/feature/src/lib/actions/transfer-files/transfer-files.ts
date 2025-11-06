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
import { executeTransferFilesOnce } from "./execute-transfer-files-once"
import { createMtpWatcher, MtpWatcherFactory } from "./mtp-watcher"
import { ApiDeviceMTPTransferErrorName } from "./transfer-files.types"

export const transferFiles = async (
  params: TransferFilesParams<ApiDevice>,
  mtpWatcherFactory: MtpWatcherFactory = createMtpWatcher
): Promise<ExecuteTransferResult> => {
  const transferMode = params.transferMode ?? TransferMode.Mtp
  const autoSwitchMTPTransferModeEnabled =
    params.autoSwitchMTPTransferModeEnabled ?? true
  const autoSwitchMTPMax = Math.max(0, params.autoSwitchMTPMax ?? 1)

  const { reportProgress, finalizeProgress } = createTransferProgressTracker({
    onProgress: params.onProgress,
  })

  let mtpEntries = 0
  let mode = transferMode
  let currentFiles: TransferFileEntry[] = params.files
  let mtpWatcherTriggeredAbort = false

  const mtpWatcher = mtpWatcherFactory({
    onReconnect: () => {
      mtpWatcherTriggeredAbort = true
      params.abortController?.abort()
    },
  })

  if (mode === TransferMode.Serial && autoSwitchMTPTransferModeEnabled) {
    mtpWatcher.start()
  }

  try {
    while (true) {
      const result = await executeTransferFilesOnce(
        params,
        mode,
        currentFiles,
        reportProgress
      )

      if (result.ok) {
        finalizeProgress()
        return result as ExecuteTransferResult
      }

      if (
        result.error.name === FailedTransferErrorName.Aborted &&
        !mtpWatcherTriggeredAbort
      ) {
        return result as ExecuteTransferResult
      }

      if (
        (result.error.name === FailedTransferErrorName.Aborted &&
          mtpWatcherTriggeredAbort) ||
        result.error.name ===
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
      ) {
        const narrowed = narrowToAbortedFailures(
          currentFiles,
          result.data?.failed
        )

        if (!narrowed) {
          finalizeProgress()
          return AppResultFactory.success({})
        }

        const { nextMode, mtpEntries: nextMtpEntries } = chooseNextMode(
          mode,
          mtpEntries,
          autoSwitchMTPTransferModeEnabled,
          autoSwitchMTPMax
        )

        if (nextMode === TransferMode.Serial) {
          mtpWatcher.start()
        } else {
          mtpWatcher.stop()
        }

        if (nextMode !== mode) {
          params.onModeChange?.(nextMode)
        }

        mode = nextMode
        mtpEntries = nextMtpEntries
        currentFiles = narrowed
        continue
      }

      return result as ExecuteTransferResult
    }
  } catch (error: unknown) {
    console.warn("File transfer failed", error)

    const failed = currentFiles.map((file) => ({
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

function narrowToAbortedFailures(
  currentFiles: TransferFileEntry[],
  failedItems: FailedTransferItem[] = []
): TransferFileEntry[] | null {
  const switchFailures = failedItems.filter((x) => {
    return (
      x.errorName === FailedTransferErrorName.Aborted ||
      x.errorName === ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  })
  if (switchFailures.length === 0) {
    return null
  }

  return currentFiles.filter((file) =>
    switchFailures.some((fail) => fail.id === file.id)
  )
}

function chooseNextMode(
  currentMode: TransferMode,
  mtpEntries: number,
  autoSwitchEnabled: boolean,
  autoSwitchMTPMax: number
): { nextMode: TransferMode; mtpEntries: number } {
  if (!autoSwitchEnabled) {
    return { nextMode: TransferMode.Serial, mtpEntries }
  }

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
