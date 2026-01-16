/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo, useState } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import { OpenDialogOptionsLite } from "app-utils/models"
import { AppActions } from "app-utils/renderer"
import { openFileDialog, useActiveDeviceQuery } from "devices/common/feature"
import {
  FileManagerFile,
  ManageFiles,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
import {
  useApiDeviceDeleteEntitiesMutation,
  useApiEntitiesDataQuery,
} from "devices/api-device/feature"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { useDeviceManageFiles } from "./use-device-manage-files"
import { OTHER_FILES_LABEL_TEXTS } from "./device-manage-files.config"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"
import { ScreenLoader } from "app-theme/ui"
import { DeviceManageFilesList } from "./device-manage-files-list"
import { FileEntity } from "./map-to-category-file-map"
import { useDeviceFilePreviewMutation } from "./use-device-file-preview.mutation"
import { useDeviceFileTransferMutation } from "./use-device-file-transfer.mutation"

export const DeviceManageFilesScreen: FunctionComponent<{
  feature: DeviceManageFileFeatureId
}> = ({ feature }) => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()

  const {
    data: storageInfo,
    progress,
    isLoading,
  } = useDeviceManageFiles(feature)

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    storageInfo.categories?.[0]?.id
  )

  if (storageInfo.categories?.length && !activeCategoryId) {
    setActiveCategoryId(storageInfo.categories[0].id)
  }

  const { data: files } = useApiEntitiesDataQuery<
    FileEntity[],
    FileManagerFile[]
  >(activeCategoryId, device, (data) => {
    return (
      data
        .filter((file) => {
          return (
            file.isInternal === (feature === DeviceManageFileFeature.Internal)
          )
        })
        .sort((a, b) => {
          const patterns = [
            /^\p{L}.*/u, // Compare letter values
            /^\d+$/, // Compare numeric values
            /^[^a-zA-Z\d\s@]+$/, // Compare special character values
          ]

          for (const pattern of patterns) {
            const aMatches = pattern.test(a.fileName)
            const bMatches = pattern.test(b.fileName)

            if (aMatches && !bMatches) return -1
            if (!aMatches && bMatches) return 1
          }
          return a.fileName.localeCompare(b.fileName)
        })
        .map((file) => {
          return {
            id: file.id,
            name: file.fileName,
            size: file.fileSize,
            type: file.extension,
            path: file.filePath,
            mimeType: file.mimeType,
            additionalInfo: file.additionalInfo,
          }
        }) || []
    )
  })

  const targetDirectoryPath = useMemo(() => {
    return storageInfo.categories.find(({ id }) => id === activeCategoryId)
      ?.directoryPath
  }, [activeCategoryId, storageInfo.categories])

  const { mutateAsync: deleteMutation } =
    useApiDeviceDeleteEntitiesMutation(device)

  const { mutateAsync: downloadPreview } = useDeviceFilePreviewMutation(device)

  const { mutateAsync: transferFiles } = useDeviceFileTransferMutation(
    activeCategoryId,
    device,
    targetDirectoryPath
  )

  const deleteFiles: ManageFilesViewProps["deleteFiles"] = async (
    ids: string[]
  ): Promise<{ failedIds: string[] }> => {
    const { failedIds = [] } = await deleteMutation({
      entityType: activeCategoryId,
      ids,
    })
    return { failedIds }
  }

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

  const openDirectoryDialog = async (
    options: OpenDialogOptionsLite
  ): Promise<string | null> => {
    const directories = await AppActions.openFileDialog(options)
    return directories[0] ?? null
  }

  return (
    <>
      <DashboardHeaderTitle title={"Manage Files"} />
      <ScreenLoader
        loading={isLoading}
        message={manageFilesMessages.loadStateText.id}
        progress={progress}
      >
        <ManageFiles
          files={files}
          feature={feature}
          storageInfo={{ ...storageInfo, otherFiles: OTHER_FILES_LABEL_TEXTS }}
          deviceId={device?.id}
          activeCategoryId={activeCategoryId}
          onActiveCategoryChange={setActiveCategoryId}
          deleteFiles={deleteFiles}
          openFileDialog={openFileDialog}
          openDirectoryDialog={openDirectoryDialog}
          transferFiles={transferFiles}
          messages={messages}
          downloadFilePreview={
            activeCategoryId === "imageFiles" ? downloadPreview : undefined
          }
        >
          {(props) => {
            return <DeviceManageFilesList {...props} />
          }}
        </ManageFiles>
      </ScreenLoader>
    </>
  )
}
