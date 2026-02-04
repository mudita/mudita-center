/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiDevice } from "devices/api-device/models"
import {
  transferFiles,
  useApiEntitiesDataQuery,
} from "devices/api-device/feature"
import {
  FailedTransferErrorName,
  TransferFileEntry,
  TransferFilesActionType,
} from "devices/common/models"
import {
  AnalyticsEvent,
  AnalyticsEventCategory,
  AppError,
  AppResultFactory,
} from "app-utils/models"
import {
  FileManagerFile,
  UseManageFilesTransferFlowArgs,
} from "devices/common/ui"
import { useTrack } from "app-utils/renderer"
import { useCallback } from "react"

type Payload = Parameters<UseManageFilesTransferFlowArgs["transferFiles"]>[0]

const mutationFn = async ({
  targetDirectoryPath,
  device,
  entityType,
  files,
  actionType,
  onProgress,
  abortController,
  track,
  refetch,
  ...rest
}: Payload & {
  device?: ApiDevice
  entityType: string
  targetDirectoryPath?: string
  track?: (event: AnalyticsEvent) => void
  refetch: (onProgress: (process: number) => void) => Promise<void>
}) => {
  let transferProgress = 0
  let refetchProgress = 0

  const handleProgress = (file?: FileManagerFile) => {
    const progress = Math.floor(transferProgress * 0.9 + refetchProgress * 0.1)

    const refreshingMessageFile =
      transferProgress === 100
        ? {
            id: "",
            path: "",
            type: "",
            mimeType: "",
            size: 0,
            name: "Refreshing files list...",
          }
        : undefined

    onProgress?.({
      progress,
      file: file || refreshingMessageFile,
    })
  }

  if (
    !device ||
    (actionType === TransferFilesActionType.Upload && !targetDirectoryPath)
  ) {
    return AppResultFactory.failed(
      new AppError("", FailedTransferErrorName.Unknown),
      {
        failed: files.map((f) => ({
          ...f,
          errorName: FailedTransferErrorName.Unknown,
        })),
      }
    )
  }

  const transferEntries: TransferFileEntry[] =
    actionType === TransferFilesActionType.Upload
      ? files.map((file) => ({
          id: file.id,
          source: {
            type: "fileLocation",
            fileLocation: { absolute: true, fileAbsolutePath: file.id },
          },
          target: {
            type: "path",
            path: `${targetDirectoryPath}${file.name}`,
          },
        }))
      : files.map((file) => ({
          id: file.id,
          source: {
            type: "path",
            path: file.path,
            fileSize: file.size,
          },
          target: {
            type: "path",
            path: file.id,
          },
        }))

  const result = await transferFiles({
    device,
    files: transferEntries,
    action: actionType,
    onProgress: ({ progress, ...transferFilesProgress }) => {
      transferProgress = progress
      handleProgress(transferFilesProgress.file)
    },
    entityType,
    abortController,
    ...rest,
  })

  const failedFiles = result.data?.failed ?? []

  const succeededLength = result.ok ? files.length - failedFiles.length : 0
  const failedLength = failedFiles.length
  const isAborted = failedFiles.some(
    (file) => file.errorName === FailedTransferErrorName.Aborted
  )

  const status =
    failedLength === 0 ? "succeeded" : isAborted ? "aborted" : "failed"
  const modes = result.data?.trackedModes
    .map((mode) => (mode === "mtp" ? "m" : "s"))
    .join(",")

  void track?.({
    e_c: AnalyticsEventCategory.FileTransferSend,
    e_a: `${status}/${succeededLength},${failedLength}/${modes}`,
  })

  handleProgress()
  if (succeededLength > 0) {
    await refetch((progress) => {
      refetchProgress = progress
      handleProgress()
    })
  }
  refetchProgress = 100
  handleProgress()
  await new Promise((resolve) => setTimeout(resolve, 500))

  return result
}

export const useDeviceFileTransferMutation = (
  entityType?: string,
  device?: ApiDevice,
  targetDirectoryPath?: string
) => {
  const track = useTrack()
  const queryClient = useQueryClient()

  const refetch = useCallback(
    async (onProgress: (progress: number) => void) => {
      const response = await useApiEntitiesDataQuery.queryFn(
        entityType,
        device,
        onProgress
      )
      queryClient.setQueryData(
        useApiEntitiesDataQuery.queryKey(entityType, device?.id),
        response
      )
    },
    [queryClient, entityType, device]
  )

  return useMutation({
    mutationKey: useDeviceFileTransferMutation.mutationKey(
      entityType,
      device?.id
    ),
    mutationFn: (payload: Payload) => {
      if (!entityType) {
        return Promise.reject(
          new AppError(
            "Entity type is required",
            FailedTransferErrorName.Unknown
          )
        )
      }
      return mutationFn({
        ...payload,
        device,
        entityType,
        targetDirectoryPath,
        track,
        refetch,
      })
    },
  })
}

useDeviceFileTransferMutation.mutationKey = (
  entityType?: string,
  deviceId?: string
) => ["fileTransfer", deviceId, entityType]
useDeviceFileTransferMutation.mutationFn = mutationFn
