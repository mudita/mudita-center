/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useRef } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { ApiDevice } from "devices/api-device/models"
import {
  AnalyticsEventCategory,
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
import { AppActions, useTrack } from "app-utils/renderer"
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
  useApiEntitiesDataQuery,
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
import { formatMessage } from "app-localize/utils"
import { useQueryClient } from "@tanstack/react-query"
import { cloneDeep } from "lodash"
import { ScreenLoader } from "app-theme/ui"

export const DeviceManageFilesScreen: FunctionComponent<{
  feature: DeviceManageFileFeatureId
}> = ({ feature }) => {
  const queryClient = useQueryClient()
  const installationFlowRef = useRef<AppInstallationFlow>(null)

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

  const track = useTrack()

  const sortedFiles = useMemo(() => {
    const list = activeFileMap ? Object.values(activeFileMap) : []

    return (
      list?.sort((a, b) => {
        const patterns = [
          /^\p{L}.*/u, // Compare letter values
          /^\d+$/, // Compare numeric values
          /^[^a-zA-Z\d\s@]+$/, // Compare special character values
        ]

        for (const pattern of patterns) {
          const aMatches = pattern.test(a.name)
          const bMatches = pattern.test(b.name)

          if (aMatches && !bMatches) return -1
          if (!aMatches && bMatches) return 1
        }
        return a.name.localeCompare(b.name)
      }) || []
    )
  }, [activeFileMap])

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

    void track({
      e_c: AnalyticsEventCategory.FileTransferSend,
      e_a: `${status}/${succeededLength},${failedLength}/${modes}`,
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

  const install: AppInstallationFlowProps["install"] = useCallback(
    async ({ appFile, onProgress }) => {
      if (!device) {
        return AppResultFactory.failed(
          new AppError("Device or app to install is undefined")
        )
      }

      let lastTransferProgress = 0

      const filePath = `${targetDirectoryPath}${appFile.name}`
      const files = [{ ...appFile, filePath }]

      const result = await installApps({
        device,
        files,
        onProgress: ({ progress }) => {
          lastTransferProgress = progress
          onProgress({
            progress: Math.floor(progress * PROGRESS_MAIN_PROCESS_PHASE_RATIO),
            item: {
              name: appFile.name,
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
              name: appFile.name,
            },
          })
        },
      })

      return AppResultFactory.success(undefined)
    },
    [device, refetch, targetDirectoryPath]
  )

  const handleAppInstall = useCallback((file: FileManagerFile) => {
    installationFlowRef.current?.install(file)
  }, [])

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

  const handleDeleteSuccess: NonNullable<
    ManageFilesViewProps["onDeleteSuccess"]
  > = useCallback(
    async ({ deletedIds }) => {
      await queryClient.setQueryData(
        useApiEntitiesDataQuery.queryKey(activeCategoryId, device?.id),
        (oldData: FileManagerFile[] = []) => {
          return cloneDeep(oldData).filter((file) => {
            return !deletedIds?.includes(file.id)
          })
        }
      )
    },
    [activeCategoryId, device?.id, queryClient]
  )

  const loadingState = isLoading || activeCategoryId === undefined

  return (
    <>
      <DashboardHeaderTitle title={"Manage Files"} />
      <ScreenLoader
        loading={loadingState}
        message={manageFilesMessages.loadStateText.id}
        progress={progress}
      >
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
          onDeleteSuccess={handleDeleteSuccess}
          otherFiles={OTHER_FILES_LABEL_TEXTS}
          openFileDialog={openFileDialog}
          openDirectoryDialog={openDirectoryDialog}
          transferFiles={handleTransferFiles}
          messages={messages}
          downloadFilePreview={
            activeCategoryId === "imageFiles" ? downloadFilePreview : undefined
          }
        >
          {(props) => {
            if (activeCategoryId === "applicationFiles") {
              return (
                <DeviceManageAppFilesTableSection
                  files={sortedFiles}
                  onAppInstallButtonClick={handleAppInstall}
                  {...props}
                />
              )
            }
            if (activeCategoryId === "imageFiles") {
              return (
                <DeviceManageFilesTableSection
                  files={sortedFiles}
                  nameTooltipText={formatMessage(messages.photosNameTooltip)}
                  {...props}
                />
              )
            }
            return (
              <DeviceManageFilesTableSection files={sortedFiles} {...props} />
            )
          }}
        </ManageFiles>
        <AppInstallationFlow
          ref={installationFlowRef}
          messages={messages}
          install={install}
        />
      </ScreenLoader>
    </>
  )
}
