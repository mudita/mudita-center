/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import { AppResultFactory } from "app-utils/models"
import {
  openFileDialog,
  useActiveDeviceQuery,
  useManageFilesSelection,
} from "devices/common/feature"
import {
  FileTransferResult,
  ManageFiles,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
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
  } = useDeviceManageFiles(feature, device)

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

  const transferFile: ManageFilesViewProps["transferFile"] = async (
    params
  ): Promise<FileTransferResult> => {
    // TODO: Implement file transfer logic here
    return AppResultFactory.success<FileTransferResult>()
  }

  const deleteFile: ManageFilesViewProps["deleteFile"] = async (
    _fileId: string
  ): Promise<void> => {
    // TODO: Implement file deletion logic here
    return Promise.resolve()
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
        deleteFile={deleteFile}
        onDeleteSuccess={refetch}
        isLoading={isLoading}
        otherFiles={OTHER_FILES_LABEL_TEXTS}
        openFileDialog={openFileDialog}
        transferFile={transferFile}
        messages={messages}
        onTransferSuccess={refetch}
      >
        {(props) => (
          <DeviceManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFiles>
    </>
  )
}
