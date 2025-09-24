/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatMessage, Messages } from "app-localize/utils"
import { formatBytes } from "app-theme/ui"
import {
  FileFailed,
  FileManagerFile,
  TransferErrorName,
} from "./manage-files.types"

export interface FileTransferFailed extends FileManagerFile {
  errorName: TransferErrorName
  values?: Record<string, string | number> | unknown
}
export interface ManageFilesTransferFailedModalMessages {
  exportFailedErrorLabelExportUnknown: Messages
  uploadFailedAllModalTitle: Messages
  uploadFailedSomeModalTitle: Messages
  uploadFailedAllModalDescription: Messages
  uploadFailedSomeModalDescription: Messages
  uploadFailedAllUnknownError: Messages
  uploadFailedAllDuplicatesError: Messages
  uploadFailedAllNotEnoughMemoryError: Messages
  uploadFailedAllFileTooLargeError: Messages
  uploadFailedErrorLabelUploadUnknown: Messages
  uploadFailedErrorLabelDuplicate: Messages
  uploadFailedErrorLabelCancelled: Messages
  uploadFailedErrorLabelTooBig: Messages
  uploadFailedErrorLabelFileTooLarge: Messages
  uploadFailedModalCloseButtonText: Messages
}

const reasonToLabel = (m: ManageFilesTransferFailedModalMessages) =>
  ({
    [TransferErrorName.Duplicate]: m.uploadFailedErrorLabelDuplicate,
    [TransferErrorName.NotEnoughMemory]: m.uploadFailedErrorLabelTooBig,
    [TransferErrorName.FileTooLarge]: m.uploadFailedErrorLabelFileTooLarge,
    [TransferErrorName.Cancelled]: m.uploadFailedErrorLabelCancelled,
    [TransferErrorName.UploadUnknown]: m.uploadFailedErrorLabelUploadUnknown,
    [TransferErrorName.ExportUnknown]: m.exportFailedErrorLabelExportUnknown,
  }) as const

const allFailedSpecificMessage = (m: ManageFilesTransferFailedModalMessages) =>
  ({
    [TransferErrorName.Duplicate]: m.uploadFailedAllDuplicatesError,
    [TransferErrorName.NotEnoughMemory]: m.uploadFailedAllNotEnoughMemoryError,
    [TransferErrorName.FileTooLarge]: m.uploadFailedAllFileTooLargeError,
    [TransferErrorName.Cancelled]: null,
    [TransferErrorName.UploadUnknown]: null,
    [TransferErrorName.ExportUnknown]: null,
  }) as const

export type ReasonStats = Record<TransferErrorName, number>

const emptyStats = (): ReasonStats => ({
  [TransferErrorName.Duplicate]: 0,
  [TransferErrorName.NotEnoughMemory]: 0,
  [TransferErrorName.FileTooLarge]: 0,
  [TransferErrorName.Cancelled]: 0,
  [TransferErrorName.UploadUnknown]: 0,
  [TransferErrorName.ExportUnknown]: 0,
})

export const groupReasons = (failed: FileTransferFailed[]): ReasonStats =>
  failed.reduce<ReasonStats>((acc, { errorName }) => {
    acc[errorName] = (acc[errorName] ?? 0) + 1
    return acc
  }, emptyStats())

export const distinctReasons = (stats: ReasonStats): TransferErrorName[] =>
  (Object.keys(stats) as TransferErrorName[]).filter((k) => stats[k] > 0)

export const getErrorLabelForReason = (
  reason: TransferErrorName,
  messages: ManageFilesTransferFailedModalMessages
): Messages =>
  reasonToLabel(messages)[reason] ??
  messages.uploadFailedErrorLabelUploadUnknown

export interface BuildCopyArgs {
  failedFiles: FileTransferFailed[]
  total: number
  messages: ManageFilesTransferFailedModalMessages
}

export interface FailureCopy {
  title: string
  description: string
  isAllFailed: boolean
  onlySingleReason: boolean
}

export const getTransferFailedModalContent = ({
  failedFiles,
  total,
  messages,
}: BuildCopyArgs): FailureCopy => {
  const failedCount = failedFiles.length
  const isAllFailed = total > 0 && failedCount === total
  const succeededCount = Math.max(total - failedCount, 0)
  const memory = (
    failedFiles.find((f) => f.errorName === TransferErrorName.NotEnoughMemory)
      ?.values as { memory: number } | undefined
  )?.memory

  const title = isAllFailed
    ? formatMessage(messages.uploadFailedAllModalTitle, { failedCount })
    : formatMessage(messages.uploadFailedSomeModalTitle)

  const description = isAllFailed
    ? formatMessage(messages.uploadFailedAllModalDescription, { failedCount })
    : formatMessage(messages.uploadFailedSomeModalDescription, {
        failedCount,
        succeededCount,
      })

  if (!isAllFailed) {
    return { title, description, isAllFailed, onlySingleReason: false }
  }

  const stats = groupReasons(failedFiles)
  const reasons = distinctReasons(stats)
  const onlySingleReason = reasons.length === 1

  let specificDescription: string | null = null
  if (onlySingleReason) {
    const msg = allFailedSpecificMessage(messages)[reasons[0]]
    if (msg) {
      specificDescription = formatMessage(msg, {
        filesCount: failedCount,
        memory:
          memory && !isNaN(Number(memory))
            ? formatBytes(Number(memory), { minUnit: "MB" })
            : undefined,
      })
    }
  }

  const fallbackUnknownDescription = formatMessage(
    messages.uploadFailedAllUnknownError
  )
  return {
    title,
    isAllFailed,
    onlySingleReason,
    description: specificDescription || fallbackUnknownDescription,
  }
}

export const mapFailedFilesWithLabels = (
  failedFiles: FileTransferFailed[],
  messages: ManageFilesTransferFailedModalMessages
): FileFailed[] =>
  failedFiles.map((file) => ({
    ...file,
    label: formatMessage(getErrorLabelForReason(file.errorName, messages)),
  }))
