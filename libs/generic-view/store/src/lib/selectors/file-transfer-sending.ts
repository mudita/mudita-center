/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  FileGroupId,
  FileTransferFailed,
  FileTransferFinished,
  FileTransferSucceeded,
} from "../file-transfer/reducer"

const selectFilesSending = createSelector(
  (state: ReduxRootState) => state.genericFileTransfer,
  (genericFileTransfer) => genericFileTransfer.filesTransferSend
)

export const selectFilesTransferMode = createSelector(
  (state: ReduxRootState) => state.genericFileTransfer,
  (genericFileTransfer) => genericFileTransfer.filesTransferMode
)

export const selectFilesSendingGroup = createSelector(
  selectFilesSending,
  (
    _: ReduxRootState,
    ids?:
      | {
          groupId: FileGroupId
        }
      | {
          filesIds: FileGroupId[]
        }
  ) => ids,
  (filesTransferSend, ids) => {
    if (!ids) {
      return Object.values(filesTransferSend)
    }
    return Object.values(filesTransferSend).filter((file) =>
      "groupId" in ids
        ? file.groupId === ids.groupId
        : ids.filesIds.includes(file.id)
    )
  }
)

export const selectFilesSendingCount = createSelector(
  selectFilesSendingGroup,
  (filesTransferGroup) => filesTransferGroup.length
)

export enum FilesSendingStatus {
  Idle = "idle",
  Pending = "pending",
  InProgress = "in-progress",
  Finished = "finished",
}

const selectFilesSendingStatus = createSelector(
  selectFilesSendingGroup,
  selectFilesSendingCount,
  (filesTransferGroup, filesCount) => {
    if (filesCount === 0) {
      return FilesSendingStatus.Idle
    }
    const statuses = filesTransferGroup.map((file) => file.status)
    if (statuses.every((status) => status === "pending")) {
      return FilesSendingStatus.Pending
    }
    if (statuses.every((status) => status === "finished")) {
      return FilesSendingStatus.Finished
    }
    return FilesSendingStatus.InProgress
  }
)

const selectFilesSendingTotalSize = createSelector(
  selectFilesSendingGroup,
  (filesTransferGroup) => {
    return filesTransferGroup.reduce((acc, file) => acc + file.size, 0)
  }
)

export const selectFilesSendingCurrentFile = createSelector(
  selectFilesSendingGroup,
  (filesTransferGroup) => {
    const fileInProgress = filesTransferGroup.find(
      (file) => file.status === "in-progress"
    )
    if (!fileInProgress) {
      return filesTransferGroup.find((file) => file.status === "pending")
    }
    return fileInProgress
  }
)

const selectFilesSendingFinished = createSelector(
  selectFilesSendingGroup,
  (filesTransferGroup) => {
    return filesTransferGroup.filter(
      (file) => file.status === "finished"
    ) as FileTransferFinished[]
  }
)

export const selectFilesSendingSucceeded = createSelector(
  selectFilesSendingFinished,
  (filesTransferFinished) => {
    return filesTransferFinished.filter(
      (file) => !("error" in file)
    ) as FileTransferSucceeded[]
  }
)

export const selectFilesSendingFailed = createSelector(
  selectFilesSendingFinished,
  (filesTransferFinished) => {
    return filesTransferFinished.filter(
      (file) => "error" in file
    ) as FileTransferFailed[]
  }
)

export const selectFilesSendingProgress = createSelector(
  selectFilesSendingGroup,
  selectFilesSendingTotalSize,
  selectFilesSendingStatus,
  (filesTransferGroup, totalSize, status) => {
    if (totalSize === 0 || status === FilesSendingStatus.Idle) {
      return 0
    }
    if (status === FilesSendingStatus.Finished) {
      return 100
    }

    const progress = filesTransferGroup.reduce((acc, file) => {
      let fileProgress: number

      switch (file.status) {
        case "in-progress":
          fileProgress =
            file.progress.chunksTransferred / file.progress.chunksCount
          break
        case "finished":
          fileProgress = 1
          break
        case "pending":
        default:
          fileProgress = 0
          break
      }
      const fileSizeWeight = file.size / totalSize
      return acc + fileProgress * fileSizeWeight
    }, 0)
    return Math.round(progress * 100)
  }
)

export const selectValidationFailureType = createSelector(
  (state: ReduxRootState) => state.genericFileTransfer,
  (state: ReduxRootState, uploadActionId: string) => uploadActionId,
  (genericFileTransfer, uploadActionId) => {
    const error = genericFileTransfer.filesTransferErrors?.[
      uploadActionId
    ]?.find(({ type }) => type)
    return error?.error
  }
)
