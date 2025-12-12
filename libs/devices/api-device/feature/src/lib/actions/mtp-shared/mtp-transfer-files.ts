/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sumBy } from "lodash"
import { AppError, AppResultFactory } from "app-utils/models"
import { ApiDevice } from "devices/api-device/models"
import { MTPError } from "app-mtp/models"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFilesActionType,
} from "devices/common/models"
import { delay } from "app-utils/common"
import { AppMtp } from "app-mtp/renderer"
import { prepareMtpTransfer } from "./prepare-mtp-transfer"

export interface MtpTransferEntry {
  id: string
  fileName: string
  fileSize: number
  isInternal: boolean
  sourcePath: string
  destinationPath: string
  action: TransferFilesActionType
}

export interface MtpTransferFilesParams {
  device: ExecuteTransferParams<ApiDevice>["device"]
  files: MtpTransferEntry[]
  failed?: FailedTransferItem[]
  abortController: ExecuteTransferParams<ApiDevice>["abortController"]
  onProgress?: ExecuteTransferParams<ApiDevice>["onProgress"]
}

export const mtpTransferFiles = async (
  params: MtpTransferFilesParams
): Promise<ExecuteTransferResult> => {
  const prepareMtpTransferResult = await prepareMtpTransfer(params)

  if (!prepareMtpTransferResult.ok) {
    return prepareMtpTransferResult
  }

  const { deviceId, storages } = prepareMtpTransferResult.data
  const {
    files,
    abortController,
    onProgress,
    failed: initialFailed = [],
  } = params

  const failed: FailedTransferItem[] = [...initialFailed]

  const totalSize = sumBy(files, "fileSize")
  let transferredTotalSize = 0

  onProgress?.({ progress: 0, loaded: 0, total: totalSize })

  for (const file of files) {
    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }

    const storageId = storages.find((s) => s.isInternal === file.isInternal)?.id

    if (!storageId) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Unknown,
      })
      continue
    }

    const startTransferFileResult = await AppMtp.startTransferFile({
      deviceId,
      storageId,
      sourcePath: file.sourcePath,
      destinationPath: file.destinationPath,
      action: file.action,
    })

    if (!startTransferFileResult.ok) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Unknown,
      })
      continue
    }

    const { transactionId } = startTransferFileResult.data

    if (abortController.signal.aborted) {
      const cancelFileTransferResult =
        await AppMtp.cancelFileTransfer(transactionId)
      if (
        !cancelFileTransferResult.ok &&
        cancelFileTransferResult.error.name ===
          MTPError.MTP_CANCEL_FAILED_ALREADY_TRANSFERRED
      ) {
        continue
      }

      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }

    const checkTransferredFileProgress = async (): Promise<
      undefined | AppError
    > => {
      const getTransferredFileProgressResult =
        await AppMtp.getTransferredFileProgress(transactionId)

      if (getTransferredFileProgressResult.ok) {
        const dataProgress =
          getTransferredFileProgressResult.data.progress >= 100
            ? 100
            : getTransferredFileProgressResult.data.progress

        const transferredWithinFile = Math.floor(
          (file.fileSize * dataProgress) / 100
        )

        const fileProgress = Math.floor(
          (transferredWithinFile / file.fileSize) * 100
        )
        const loaded = transferredTotalSize + transferredWithinFile
        const progress = Math.floor((loaded / totalSize) * 100)

        onProgress?.({
          progress,
          loaded,
          total: totalSize,
          file: {
            id: file.id,
            name: file.fileName,
            size: file.fileSize,
            type: "file",
            loaded: transferredWithinFile,
            progress: fileProgress,
            mimeType: "",
            path: "",
          },
        })

        if (dataProgress === 100) {
          return
        }
      }

      if (abortController.signal.aborted) {
        const cancelFileTransferResult =
          await AppMtp.cancelFileTransfer(transactionId)
        if (
          !cancelFileTransferResult.ok &&
          cancelFileTransferResult.error.name ===
            MTPError.MTP_CANCEL_FAILED_ALREADY_TRANSFERRED
        ) {
          return
        }

        return new AppError("", FailedTransferErrorName.Aborted)
      }

      if (!getTransferredFileProgressResult.ok) {
        return getTransferredFileProgressResult.error
      }

      await delay(250, abortController.signal)
      return await checkTransferredFileProgress()
    }

    const checkTransferredFileProgressResult =
      await checkTransferredFileProgress()

    if (checkTransferredFileProgressResult) {
      failed.push({
        id: file.id,
        errorName:
          checkTransferredFileProgressResult.name as FailedTransferErrorName,
      })
      continue
    }

    transferredTotalSize += file.fileSize
  }

  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({ failed })
}
