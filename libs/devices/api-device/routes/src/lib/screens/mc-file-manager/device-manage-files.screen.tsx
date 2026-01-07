/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useState } from "react"
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
  AppInstallationFlow,
  AppInstallationFlowProps,
  FileManagerFile,
  FilesManagerFilePreviewDownload,
  ManageFiles,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
import {
  installApps,
  transferFiles,
  useApiDeviceDeleteEntitiesMutation,
} from "devices/api-device/feature"
import { DeviceManageAppFilesTableSection } from "./device-manage-files-table-section/device-manage-app-files-table-section"
import { DeviceManageFilesTableSection } from "./device-manage-files-table-section/device-manage-files-table-section"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { useDeviceManageFiles } from "./use-device-manage-files"
import {
  OTHER_FILES_LABEL_TEXTS,
  PROGRESS_MAIN_PROCESS_PHASE_RATIO,
  PROGRESS_REFETCH_PHASE_RATIO,
} from "./device-manage-files.config"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"

export const DeviceManageFilesScreen: FunctionComponent<{
  feature: DeviceManageFileFeatureId
}> = ({ feature }) => {
  const [appToInstall, setAppToInstall] = useState<
    FileManagerFile | undefined
  >()
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

  const targetDirectoryPath = useMemo(() => {
    return categories.find(({ id }) => id === activeCategoryId)?.directoryPath
  }, [activeCategoryId, categories])

  const handleTransferFiles: ManageFilesViewProps["transferFiles"] = async (
    params
  ): Promise<ExecuteTransferResult> => {
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
              path: file.path,
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
          progress: Math.floor(progress * PROGRESS_MAIN_PROCESS_PHASE_RATIO),
        })
      },
      abortController: params.abortController,
      entityType: activeCategoryId,
    })

    await refetch({
      onProgress: (refetchProgress) => {
        const combined =
          lastTransferProgress * PROGRESS_MAIN_PROCESS_PHASE_RATIO +
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

  const install: AppInstallationFlowProps["install"] = async ({
    onProgress,
  }) => {
    if (!device || !appToInstall) {
      return AppResultFactory.failed(
        new AppError("Device or app to install is undefined")
      )
    }

    let lastTransferProgress = 0

    const filePath = `${targetDirectoryPath}${appToInstall.name}`
    const files = [{ ...appToInstall, filePath }]

    const result = await installApps({
      device,
      files,
      onProgress: ({ progress }) => {
        lastTransferProgress = progress
        onProgress({
          progress: Math.floor(progress * PROGRESS_MAIN_PROCESS_PHASE_RATIO),
          item: {
            name: appToInstall.name,
          },
        })
      },
    })

    if (!result.ok) {
      return result
    }

    await refetch({
      onProgress: (refetchProgress) => {
        const combined =
          lastTransferProgress * PROGRESS_MAIN_PROCESS_PHASE_RATIO +
          refetchProgress * PROGRESS_REFETCH_PHASE_RATIO

        onProgress?.({
          progress: Math.floor(combined),
          item: {
            name: appToInstall.name,
          },
        })
      },
    })

    return AppResultFactory.success(undefined)
  }

  const downloadFilePreview: FilesManagerFilePreviewDownload = useCallback(
    async (file, abortController) => {
      if (!device) {
        return AppResultFactory.failed(new AppError("Device not found"))
      }

      const fileResponse = await transferFiles({
        device,
        action: TransferFilesActionType.Download,
        files: [
          {
            id: file.id,
            source: {
              type: "path",
              path: file.path,
            },
            target: { type: "memory" },
          },
        ],
        abortController,
      })
      if (!fileResponse.ok) {
        return AppResultFactory.failed(fileResponse.error)
      }
      if (!("files" in fileResponse.data)) {
        return AppResultFactory.failed(new AppError("Invalid file response"))
      }
      return AppResultFactory.success(fileResponse.data.files[0] as string)
    },
    [device]
  )

  return (
    <>
      <DashboardHeaderTitle title={"Manage Files"} />
      <ManageFiles
        deviceId={device?.id}
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
        downloadFilePreview={
          activeCategoryId === "imageFiles" ? downloadFilePreview : undefined
        }
      >
        {(props) => {
          if (activeCategoryId === "applicationFiles") {
            return (
              <DeviceManageAppFilesTableSection
                fileMap={activeFileMap}
                onAppInstallButtonClick={(file) => setAppToInstall(file)}
                {...props}
              />
            )
          }
          if (activeCategoryId === "imageFiles") {
            return (
              <DeviceManageFilesTableSection
                fileMap={activeFileMap}
                nameTooltipText={"Preview photo"}
                {...props}
              />
            )
          }
          return (
            <DeviceManageFilesTableSection fileMap={activeFileMap} {...props} />
          )
        }}
      </ManageFiles>
      <AppInstallationFlow
        opened={appToInstall !== undefined}
        onClose={() => setAppToInstall(undefined)}
        messages={messages}
        install={install}
      />
    </>
  )
}
