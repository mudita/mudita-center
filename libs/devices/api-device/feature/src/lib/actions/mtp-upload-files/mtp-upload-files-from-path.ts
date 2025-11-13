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
  TransferFileFromPathEntry,
} from "devices/common/models"
import { AppMtp } from "app-mtp/renderer"
import { readFileTransferMetadataList } from "app-utils/renderer"
import { delay } from "app-utils/common"
import { ApiDeviceMTPTransferErrorName } from "../transfer-files/transfer-files.types"
import { isMtpPathInternal, sliceMtpPaths } from "../mtp-shared/mtp-helpers"

export interface MtpUploadFilesFromPathParams
  extends ExecuteTransferParams<ApiDevice> {
  files: TransferFileFromPathEntry[]
}

export const mtpUploadFilesFromPath = async ({
  device,
  files,
  onProgress,
  abortController,
}: MtpUploadFilesFromPathParams): Promise<ExecuteTransferResult> => {
  const deviceId = await AppMtp.getMtpDeviceId(device)

  if (abortController.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  if (!deviceId) {
    return buildFailedResult(
      files,
      ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  }

  const getDeviceStoragesResult = await AppMtp.getDeviceStorages(deviceId)

  if (abortController.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  const storages = getDeviceStoragesResult.ok
    ? getDeviceStoragesResult.data
    : []

  if (!getDeviceStoragesResult.ok || storages.length === 0) {
    return buildFailedResult(
      files,
      ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  }

  const failed: FailedTransferItem[] = []
  const {
    files: fileEntryWithMetadata,
    failed: readFileTransferMetadataListFailed,
  } = await readFileTransferMetadataList(files, abortController)

  if (abortController.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  failed.push(...readFileTransferMetadataListFailed)

  const totalSize = sumBy(fileEntryWithMetadata, "fileSize")
  let uploadedTotalSize = 0

  onProgress?.({ progress: 0, loaded: 0, total: totalSize })

  for (const file of fileEntryWithMetadata) {
    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }
    const targetFilePath = file.target.path
    const fileSize = file.fileSize
    const isInternal = isMtpPathInternal(targetFilePath)
    const storageId = storages.find((s) => s.isInternal === isInternal)?.id

    if (!storageId) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Unknown,
      })
      continue
    }

    const sourcePath = getSourcePath(file)
    const destinationPath = sliceMtpPaths(targetFilePath, isInternal)

    const startSendFileViaMtpResult = await AppMtp.startSendFile({
      deviceId,
      storageId,
      sourcePath,
      destinationPath,
    })

    if (!startSendFileViaMtpResult.ok) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Unknown,
      })
      continue
    }

    const { transactionId } = startSendFileViaMtpResult.data

    if (abortController.signal.aborted) {
      const cancelSendFileResult = await AppMtp.cancelSendFile(transactionId)
      if (
        !cancelSendFileResult.ok &&
        cancelSendFileResult.error.name ===
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
    // TODO: Implement progress and abort handling
    // TODO: track info to analytics system
    const checkSendFileProgress = async (): Promise<undefined | AppError> => {
      console.log(
        `Checking MTP upload progress for transactionId: ${transactionId}, file: ${targetFilePath}`
      )
      const getSendFileProgressResult =
        await AppMtp.getSendFileProgress(transactionId)

      if (getSendFileProgressResult.ok) {
        const dataProgress =
          getSendFileProgressResult.data.progress >= 100
            ? 100
            : getSendFileProgressResult.data.progress

        const uploadedWithinFile = Math.floor((fileSize * dataProgress) / 100)

        const fileProgress = Math.floor((uploadedWithinFile / fileSize) * 100)
        const loaded = uploadedTotalSize + uploadedWithinFile
        const progress = Math.floor((loaded / totalSize) * 100)

        onProgress?.({
          progress,
          loaded,
          total: totalSize,
          file: {
            id: file.id,
            name: targetFilePath.split("/").pop() || "",
            size: fileSize,
            type: "file",
            loaded: uploadedWithinFile,
            progress: fileProgress,
          },
        })

        if (dataProgress === 100) {
          return
        }
      }

      if (abortController.signal.aborted) {
        const cancelSendFileResult = await AppMtp.cancelSendFile(transactionId)
        if (
          !cancelSendFileResult.ok &&
          cancelSendFileResult.error.name ===
            MTPError.MTP_CANCEL_FAILED_ALREADY_TRANSFERRED
        ) {
          return
        }

        return new AppError("", FailedTransferErrorName.Aborted)
      }

      if (!getSendFileProgressResult.ok) {
        return getSendFileProgressResult.error
      }

      await delay(250, abortController.signal)
      return await checkSendFileProgress()
    }

    const checkSendFileProgressResult = await checkSendFileProgress()

    if (checkSendFileProgressResult) {
      failed.push({
        id: file.id,
        errorName: checkSendFileProgressResult.name as FailedTransferErrorName,
      })
      continue
    }

    uploadedTotalSize += fileSize
  }

  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({ failed })
}

const buildFailedResult = (
  files: ExecuteTransferParams<ApiDevice>["files"],
  errorName: ApiDeviceMTPTransferErrorName | FailedTransferErrorName | string
): ExecuteTransferResult => {
  return AppResultFactory.failed(new AppError("", errorName), {
    failed: files.map((file) => ({
      id: file.id,
      errorName,
    })),
  })
}

const getSourcePath = (file: TransferFileFromPathEntry): string => {
  const value = file.source.fileLocation.fileAbsolutePath

  if (typeof value === "string") {
    return value
  }

  if (Array.isArray(value)) {
    return value.join("/")
  }

  return ""
}
