/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useRef } from "react"
import {
  AppInstallationFlow,
  AppInstallationFlowProps,
  FileManagerFile,
} from "devices/common/ui"
import { DeviceManageFilesTableSection } from "./device-manage-files-table-section/device-manage-files-table-section"
import {
  DeviceManageAppFile,
  DeviceManageAppFilesTableSection,
} from "./device-manage-files-table-section/device-manage-app-files-table-section"
import { deviceManageFilesMessages } from "./device-manage-files.messages"
import { AppError, AppResultFactory } from "app-utils/models"
import { useQueryClient } from "@tanstack/react-query"
import { useActiveDeviceQuery } from "devices/common/feature"
import { ApiDevice } from "devices/api-device/models"
import {
  installApps,
  useApiEntitiesDataQuery,
} from "devices/api-device/feature"
import {
  PROGRESS_MAIN_PROCESS_PHASE_RATIO,
  PROGRESS_REFETCH_PHASE_RATIO,
} from "./device-manage-files.config"

interface Props {
  files?: FileManagerFile[]
  categoryId: string
  onRowClick?: (fileId?: string) => void
}

export const DeviceManageFilesList: FunctionComponent<Props> = ({
  files,
  categoryId,
  onRowClick,
}) => {
  if (!files) {
    return null
  }

  switch (categoryId) {
    case "imageFiles":
      return <ImageCategory files={files} onRowClick={onRowClick} />
    case "applicationFiles":
      return <AppCategory files={files} categoryId={categoryId} />
    default:
      return <DefaultCategory files={files} />
  }
}

interface CategoryProps {
  files: FileManagerFile[]
}

const DefaultCategory: FunctionComponent<CategoryProps> = ({ files }) => {
  return <DeviceManageFilesTableSection files={files} />
}

const ImageCategory: FunctionComponent<
  CategoryProps & Pick<Props, "onRowClick">
> = ({ files, onRowClick }) => {
  return <DeviceManageFilesTableSection files={files} onRowClick={onRowClick} />
}

const AppCategory: FunctionComponent<
  CategoryProps & { categoryId: string }
> = ({ files, categoryId }) => {
  const queryClient = useQueryClient()

  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const installationFlowRef = useRef<AppInstallationFlow>(null)

  const handleInstallClick = useCallback((file: FileManagerFile) => {
    installationFlowRef.current?.install(file)
  }, [])

  const installApp: AppInstallationFlowProps["install"] = useCallback(
    async ({ appFile, onProgress }) => {
      if (!device) {
        return AppResultFactory.failed(
          new AppError("Device or app to install is undefined")
        )
      }

      let lastTransferProgress = 0

      const files = [{ ...appFile, filePath: appFile.path }]

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

      const data = await useApiEntitiesDataQuery.queryFn(
        categoryId,
        device,
        (refetchProgress) => {
          const combined =
            lastTransferProgress * PROGRESS_MAIN_PROCESS_PHASE_RATIO +
            refetchProgress * PROGRESS_REFETCH_PHASE_RATIO

          onProgress?.({
            progress: Math.floor(combined),
            item: {
              name: appFile.name,
            },
          })
        }
      )
      queryClient.setQueryData(
        useApiEntitiesDataQuery.queryKey(categoryId, device.id),
        data
      )

      return AppResultFactory.success(undefined)
    },
    [categoryId, device, queryClient]
  )

  return (
    <>
      <DeviceManageAppFilesTableSection
        files={files as DeviceManageAppFile[]}
        onAppInstallButtonClick={handleInstallClick}
      />
      <AppInstallationFlow
        ref={installationFlowRef}
        messages={deviceManageFilesMessages}
        install={installApp}
      />
    </>
  )
}
