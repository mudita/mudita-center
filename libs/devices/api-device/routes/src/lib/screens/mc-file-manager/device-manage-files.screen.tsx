/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import {
  AppError,
  AppResultFactory,
  OpenDialogOptionsLite,
} from "app-utils/models"
import {
  ExecuteTransferResult,
  FailedTransferErrorName,
  TransferFileEntry,
  TransferFilesActionType,
} from "devices/common/models"
import { AppActions } from "app-utils/renderer"
import {
  openFileDialog,
  useActiveDeviceQuery,
  useManageFilesSelection,
} from "devices/common/feature"
import {
  ManageFiles,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
import {
  transferFiles,
  useApiDeviceDeleteEntitiesMutation,
} from "devices/api-device/feature"
import { DeviceManageFilesTableSection } from "./device-manage-files-table-section"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { useDeviceManageFiles } from "./use-device-manage-files"
import {
  OTHER_FILES_LABEL_TEXTS,
  PROGRESS_REFETCH_PHASE_RATIO,
  PROGRESS_TRANSFER_PHASE_RATIO,
} from "./device-manage-files.config"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"

export const DeviceManageFilesScreen: FunctionComponent<{
  feature: DeviceManageFileFeatureId
}> = ({ feature }) => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const {
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    refetch,
    progress,
  } = useDeviceManageFiles(feature, device)

  const { mutateAsync: deleteFilesMutate } =
    useApiDeviceDeleteEntitiesMutation(device)

  const { activeCategoryId, setActiveCategoryId, activeFileMap } =
    useManageFilesSelection({ categories, categoryFileMap })

  const summaryHeader =
    feature === DeviceManageFileFeature.Internal
      ? deviceManageFilesMessages.internalSummaryHeader
      : deviceManageFilesMessages.externalSummaryHeader

  const addFileButtonText =
    activeCategoryId === "applicationFiles"
      ? deviceManageFilesMessages.addAppFileButtonText
      : manageFilesMessages.addFileButtonText

  const messages = {
    ...deviceManageFilesMessages,
    summaryHeader,
    addFileButtonText,
  }

  const handleTransferFiles: ManageFilesViewProps["transferFiles"] = async (
    params
  ): Promise<ExecuteTransferResult> => {
    const targetDirectoryPath = categories.find(
      ({ id }) => id === activeCategoryId
    )?.directoryPath

    if (!device || !targetDirectoryPath) {
      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Unknown),
        {
          failed: params.files.map((f) => ({
            ...f,
            errorName: FailedTransferErrorName.Unknown,
          })),
        }
      )
    }

    let lastTransferProgress = 0

    const files: TransferFileEntry[] =
      params.actionType === TransferFilesActionType.Upload
        ? params.files.map((file) => ({
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
        : params.files.map((file) => ({
            id: file.id,
            source: {
              type: "path",
              path: `${targetDirectoryPath}${file.name}`,
              fileSize: file.size,
            },
            target: {
              type: "path",
              path: file.id,
            },
          }))

    const result = await transferFiles({
      ...params,
      device,
      files,
      action: params.actionType,
      onProgress: ({ progress, ...transferFilesProgress }) => {
        lastTransferProgress = progress
        return params.onProgress?.({
          ...transferFilesProgress,
          progress: Math.floor(progress * PROGRESS_TRANSFER_PHASE_RATIO),
        })
      },
      abortController: params.abortController,
      entityType: activeCategoryId,
    })

    await refetch({
      onProgress: (refetchProgress) => {
        const combined =
          lastTransferProgress * PROGRESS_TRANSFER_PHASE_RATIO +
          refetchProgress * PROGRESS_REFETCH_PHASE_RATIO

        params.onProgress?.({
          progress: Math.floor(combined),
        })
      },
    })

    return result
  }

  const deleteFiles: ManageFilesViewProps["deleteFiles"] = async (
    ids: string[]
  ): Promise<{ failedIds: string[] }> => {
    const { failedIds = [] } = await deleteFilesMutate({
      entityType: activeCategoryId,
      ids,
    })
    return { failedIds }
  }

  const openDirectoryDialog = async (
    options: OpenDialogOptionsLite
  ): Promise<string | null> => {
    const directories = await AppActions.openFileDialog(options)
    return directories[0] ?? null
  }

  return (
    <>
      <DashboardHeaderTitle title={"Manage Files"} />
      <ManageFiles
        activeCategoryId={activeCategoryId}
        activeFileMap={activeFileMap}
        onActiveCategoryChange={setActiveCategoryId}
        segments={segments}
        categories={categories}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        deleteFiles={deleteFiles}
        onDeleteSuccess={() => refetch()}
        isLoading={isLoading}
        otherFiles={OTHER_FILES_LABEL_TEXTS}
        openFileDialog={openFileDialog}
        openDirectoryDialog={openDirectoryDialog}
        transferFiles={handleTransferFiles}
        messages={messages}
        progress={progress}
      >
        {(props) => (
          <DeviceManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFiles>
    </>
  )
}
