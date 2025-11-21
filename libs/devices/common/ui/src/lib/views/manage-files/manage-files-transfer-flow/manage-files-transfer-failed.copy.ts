/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatMessage, Messages } from "app-localize/utils"
import { FailedItem, formatBytes } from "app-theme/ui"
import {
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFilesActionType,
} from "devices/common/models"
import { FileManagerFile } from "../manage-files.types"

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
    [FailedTransferErrorName.Duplicate]: m.uploadFailedErrorLabelDuplicate,
    [FailedTransferErrorName.NotEnoughMemory]: m.uploadFailedErrorLabelTooBig,
    [FailedTransferErrorName.FileTooLarge]:
      m.uploadFailedErrorLabelFileTooLarge,
    [FailedTransferErrorName.Aborted]: m.uploadFailedErrorLabelCancelled,
    [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Upload}`]:
      m.uploadFailedErrorLabelUploadUnknown,
    [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Download}`]:
      m.exportFailedErrorLabelExportUnknown,
  }) as const

const allFailedSpecificMessage = (m: ManageFilesTransferFailedModalMessages) =>
  ({
    [FailedTransferErrorName.Duplicate]: m.uploadFailedAllDuplicatesError,
    [FailedTransferErrorName.NotEnoughMemory]:
      m.uploadFailedAllNotEnoughMemoryError,
    [FailedTransferErrorName.FileTooLarge]: m.uploadFailedAllFileTooLargeError,
    [FailedTransferErrorName.Aborted]: null,
    [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Upload}`]:
      null,
    [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Download}`]:
      null,
  }) as const

type ReasonStatsErrorName =
  | FailedTransferErrorName.Aborted
  | FailedTransferErrorName.Duplicate
  | FailedTransferErrorName.NotEnoughMemory
  | FailedTransferErrorName.FileTooLarge
  | `${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Upload}`
  | `${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Download}`

export type ReasonStats = Record<ReasonStatsErrorName, number>

const emptyStats = (): ReasonStats => ({
  [FailedTransferErrorName.Duplicate]: 0,
  [FailedTransferErrorName.NotEnoughMemory]: 0,
  [FailedTransferErrorName.FileTooLarge]: 0,
  [FailedTransferErrorName.Aborted]: 0,
  [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Upload}`]: 0,
  [`${FailedTransferErrorName.Unknown}:${TransferFilesActionType.Download}`]: 0,
})

const getReasonStatsErrorName = (
  errorName: string,
  actionType: TransferFilesActionType
): ReasonStatsErrorName => {
  switch (errorName) {
    case FailedTransferErrorName.Duplicate:
      return FailedTransferErrorName.Duplicate
    case FailedTransferErrorName.NotEnoughMemory:
      return FailedTransferErrorName.NotEnoughMemory
    case FailedTransferErrorName.FileTooLarge:
      return FailedTransferErrorName.FileTooLarge
    case FailedTransferErrorName.Aborted:
      return FailedTransferErrorName.Aborted
    default:
      return `${FailedTransferErrorName.Unknown}:${actionType}`
  }
}

export const groupReasons = (
  failed: FailedTransferItem[],
  actionType: TransferFilesActionType
): ReasonStats =>
  failed.reduce<ReasonStats>((acc, { errorName }) => {
    const reasonStatsErrorName = getReasonStatsErrorName(errorName, actionType)
    acc[reasonStatsErrorName] = (acc[reasonStatsErrorName] ?? 0) + 1
    return acc
  }, emptyStats())

export const distinctReasons = (stats: ReasonStats): ReasonStatsErrorName[] =>
  (Object.keys(stats) as ReasonStatsErrorName[]).filter((k) => stats[k] > 0)

export const getErrorLabelForReason = (
  errorName: string,
  actionType: TransferFilesActionType,
  messages: ManageFilesTransferFailedModalMessages
): Messages => {
  const reasonStatsErrorName = getReasonStatsErrorName(errorName, actionType)
  return reasonToLabel(messages)[reasonStatsErrorName]
}

export interface BuildCopyArgs {
  failedFiles: FailedTransferItem[]
  total: number
  messages: ManageFilesTransferFailedModalMessages
  actionType: TransferFilesActionType
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
  actionType,
}: BuildCopyArgs): FailureCopy => {
  const failedCount = failedFiles.length
  const isAllFailed = total > 0 && failedCount === total
  const succeededCount = Math.max(total - failedCount, 0)
  const memory = (
    failedFiles.find(
      (f) => f.errorName === FailedTransferErrorName.NotEnoughMemory
    )?.values as { memory: number } | undefined
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

  const stats = groupReasons(failedFiles, actionType)
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
  allFiles: FileManagerFile[],
  failedFiles: FailedTransferItem[],
  messages: ManageFilesTransferFailedModalMessages,
  actionType: TransferFilesActionType
): FailedItem[] =>
  failedFiles.map((file) => {
    const originalFile = allFiles.find(
      (f) => f.id === file.id
    ) as FileManagerFile
    return {
      ...originalFile,
      label: formatMessage(
        getErrorLabelForReason(file.errorName, actionType, messages)
      ),
    }
  })
