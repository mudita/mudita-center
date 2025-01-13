/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import path from "node:path"
import { selectFilesSendingProgress } from "generic-view/store"
import { useSelector } from "react-redux"
import { getFileStatsRequest } from "system-utils/feature"

export enum TransferStatus {
  Idle = "idle",
  Ready = "ready",
  Sending = "sending",
  Finished = "finished",
  Failed = "failed",
  Cancelled = "cancelled",
}

type FilePath = string

interface FileInfo {
  status: "pending" | "in-progress" | "sent" | "failed"
  name: string
  size: number
  transferId?: number
  progress?: number
}

type FilesStateAction =
  | {
      type: "init"
      payload: { size: number; path: FilePath; name: string }[]
    }
  | {
      type: "update"
      path: FilePath
      payload: Partial<Omit<FileInfo, "name">>
    }
  | {
      type: "clear"
    }

type FilesState = Record<FilePath, FileInfo>

const getFileName = (filePath?: string) => {
  return path.basename(filePath ?? "")
}

const filesReducer = (state: FilesState, action: FilesStateAction) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        ...action.payload.reduce(
          (acc, { path, size, name }) => ({
            ...acc,
            [path]: {
              status: "pending",
              name,
              size,
            },
          }),
          {}
        ),
      }
    case "update":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          ...action.payload,
        },
      }
    case "clear":
      return {}
    default:
      return state
  }
}

export const useTransferringFilesInfo = () => {
  const filesSendingProgress = useSelector(selectFilesSendingProgress)
  const [totalFilesSize, setTotalFilesSize] = useState(0)
  const [files, dispatchFilesAction] = useReducer(
    filesReducer,
    {} as FilesState
  )

  const filesCount = useMemo(() => {
    return Object.keys(files).length
  }, [files])

  const currentFile = useMemo(() => {
    return Object.values(files).find(
      (fileInfo) => fileInfo.status === "in-progress"
    )
  }, [files])

  const sentFiles = useMemo(() => {
    return Object.entries(files)
      .filter(([, fileInfo]) => fileInfo.status === "sent")
      .map(([path, fileInfo]) => ({
        path,
        ...fileInfo,
      }))
  }, [files])

  const failedFiles = useMemo(() => {
    return Object.entries(files)
      .filter(([, fileInfo]) => fileInfo.status === "failed")
      .map(([path, fileInfo]) => ({
        path,
        ...fileInfo,
      }))
  }, [files])

  const transferStatus = useMemo(() => {
    if (filesCount === 0) {
      return TransferStatus.Idle
    }
    const statuses = Object.values(files).map((file) => file.status)
    if (statuses.every((status) => status === "pending")) {
      return TransferStatus.Ready
    }
    if (
      statuses.every((status) => status === "failed") ||
      statuses.every((status) => status === "sent")
    ) {
      return TransferStatus.Finished
    }
    return TransferStatus.Sending
  }, [files, filesCount])

  const transferProgress = useMemo(() => {
    if (totalFilesSize === 0) {
      return 0
    }
    return Object.values(files).reduce((acc, fileInfo) => {
      const fileProgress = fileInfo.progress || 0
      const fileSizeWeight = fileInfo.size / totalFilesSize
      return acc + fileProgress * fileSizeWeight
    }, 0)
  }, [files, totalFilesSize])

  const initFiles = useCallback(async (filesPaths: FilePath[]) => {
    const filesList = []
    let totalSize = 0

    for (const filePath of filesPaths) {
      const fileStats = await getFileStatsRequest(filePath)
      if (!fileStats.ok) {
        continue
      }
      filesList.push({
        path: filePath,
        size: fileStats.data.size,
        name: getFileName(filePath),
      })
      totalSize += fileStats.data.size
    }
    setTotalFilesSize(totalSize)
    dispatchFilesAction({ type: "init", payload: filesList })
  }, [])

  const updateFile = useCallback(
    (path: FilePath, payload: Partial<Omit<FileInfo, "name">>) => {
      dispatchFilesAction({ type: "update", path, payload })
    },
    []
  )

  const clearFiles = useCallback(() => {
    dispatchFilesAction({ type: "clear" })
  }, [])

  useEffect(() => {
    if (filesSendingProgress) {
      Object.values(filesSendingProgress).forEach(
        ({ chunksCount, chunksTransferred, filePath }) => {
          if (filePath) {
            dispatchFilesAction({
              type: "update",
              path: filePath,
              payload: {
                progress: Math.round((chunksTransferred / chunksCount) * 100),
              },
            })
          }
        }
      )
    }
  }, [filesSendingProgress, updateFile])

  return {
    files,
    transferStatus,
    transferProgress,
    filesCount,
    currentFile,
    sentFiles,
    failedFiles,
    initFiles,
    updateFile,
    clearFiles,
  }
}
