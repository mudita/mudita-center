/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import { AppError, AppResultFactory } from "app-utils/models"
import {
  ExecuteTransferResult,
  FailedTransferErrorName,
  TransferMode,
} from "devices/common/models"
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
import { OTHER_FILES_LABEL_TEXTS } from "./device-manage-files.config"
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
            errorName: "Unknown",
          })),
        }
      )
    }

    const result = await transferFiles({
      device,
      files: params.files.map((file) => ({
        id: file.id,
        source: {
          type: "fileLocation",
          fileLocation: { absolute: true, fileAbsolutePath: file.id },
        },
        target: { type: "path", path: `${targetDirectoryPath}${file.name}` },
      })),
      action: params.actionType,
      transferMode: TransferMode.Serial,
      autoSwitchMTPTransferModeEnabled: false,
      onProgress: params.onProgress,
      abortController: params.abortController,
      entityType: activeCategoryId,
    })

    // TODO: extend onprogress by refetching file list after files transfer
    await refetch()

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
        onDeleteSuccess={refetch}
        isLoading={isLoading}
        otherFiles={OTHER_FILES_LABEL_TEXTS}
        openFileDialog={openFileDialog}
        transferFiles={handleTransferFiles}
        messages={messages}
        onTransferSuccess={refetch}
        progress={progress}
      >
        {(props) => (
          <DeviceManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFiles>
    </>
  )
}
