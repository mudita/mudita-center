/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiDevice, EntityData } from "devices/api-device/models"
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
import { UseManageFilesTransferFlowArgs } from "devices/common/ui"
import {
  PROGRESS_MAIN_PROCESS_PHASE_RATIO,
  PROGRESS_REFETCH_PHASE_RATIO,
} from "./device-manage-files.config"
import { useTrack } from "app-utils/renderer"

type Payload = Parameters<UseManageFilesTransferFlowArgs["transferFiles"]>[0]

const mutationFn = async ({
  targetDirectoryPath,
  onDataReload,
  device,
  entityType,
  files,
  actionType,
  onProgress,
  abortController,
  track,
  ...rest
}: Payload & {
  device?: ApiDevice
  entityType: string
  targetDirectoryPath?: string
  onDataReload?: (data: EntityData[]) => void
  track?: (event: AnalyticsEvent) => void
}) => {
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

  let lastTransferProgress = 0

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
      lastTransferProgress = progress
      return onProgress?.({
        ...transferFilesProgress,
        progress: Math.floor(progress * PROGRESS_MAIN_PROCESS_PHASE_RATIO),
      })
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

  const data = await useApiEntitiesDataQuery.queryFn(
    entityType,
    device,
    (refetchProgress) => {
      const combined =
        lastTransferProgress * PROGRESS_MAIN_PROCESS_PHASE_RATIO +
        refetchProgress * PROGRESS_REFETCH_PHASE_RATIO
      onProgress?.({
        progress: Math.floor(combined),
      })
    },
    abortController.signal
  )

  onDataReload?.(data)
  return result
}

export const useDeviceFileTransferMutation = (
  entityType: string,
  device?: ApiDevice,
  targetDirectoryPath?: string
) => {
  const queryClient = useQueryClient()
  const track = useTrack()

  return useMutation({
    mutationFn: (payload: Payload) => {
      const onDataReload = (data: EntityData[]) => {
        queryClient.setQueryData(
          useApiEntitiesDataQuery.queryKey(entityType, device?.id),
          data
        )
      }

      return mutationFn({
        ...payload,
        device,
        entityType,
        targetDirectoryPath,
        onDataReload,
        track,
      })
    },
  })
}

useDeviceFileTransferMutation.mutationFn = mutationFn
