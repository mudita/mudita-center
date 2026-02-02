/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useMemo } from "react"
import { ApiDevice } from "devices/api-device/models"
import {
  useApiEntitiesDataQueries,
  useApiFeatureQuery,
} from "devices/api-device/feature"
import { mapDeviceToManageFiles } from "./map-to-device-manage-files-data"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"
import { useActiveDeviceQuery } from "devices/common/feature"
import { uniq } from "lodash"
import { IconType } from "app-theme/models"

export const useDeviceManageFiles = <F extends DeviceManageFileFeatureId>(
  feature: F
) => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const {
    data: internalMemory,
    isLoading: isInternalMemoryLoading,
    isError: isInternalMemoryError,
    isSuccess: isInternalMemorySuccess,
    refetch: refetchInternalMemory,
  } = useApiFeatureQuery(DeviceManageFileFeature.Internal, device)
  const {
    data: externalMemory,
    isLoading: isExternalMemoryLoading,
    isError: isExternalMemoryError,
    isSuccess: isExternalMemorySuccess,
    refetch: refetchExternalMemory,
  } = useApiFeatureQuery(DeviceManageFileFeature.External, device)

  const entitiesTypes = useMemo(() => {
    return uniq([
      ...(internalMemory?.config?.main.config.categories.map(
        (c) => c.entityType
      ) || []),
      ...(externalMemory?.config?.main.config.categories.map(
        (c) => c.entityType
      ) || []),
    ])
  }, [externalMemory, internalMemory])

  const {
    data: entitiesData,
    isLoading: isEntitiesLoading,
    isError: isEntitiesError,
    isSuccess: isEntitiesSuccess,
    refetch: refetchEntities,
    progress,
  } = useApiEntitiesDataQueries<{ isInternal: boolean }[], number>(
    entitiesTypes,
    device,
    (data) => {
      return data.filter((file) => {
        return (
          file.isInternal === (feature === DeviceManageFileFeature.Internal)
        )
      }).length
    }
  )

  const isConfigSuccess = isInternalMemorySuccess && isExternalMemorySuccess
  const isLoading =
    isInternalMemoryLoading || isExternalMemoryLoading || isEntitiesLoading
  const isConfigError = isInternalMemoryError || isExternalMemoryError

  const refetch = useCallback(async () => {
    await refetchInternalMemory()
    await refetchExternalMemory()
    await refetchEntities()
  }, [refetchEntities, refetchExternalMemory, refetchInternalMemory])

  const data = useMemo(() => {
    if (!isConfigSuccess) {
      return {
        categories: [
          {
            id: "audioFiles",
            icon: IconType.MusicNote,
            markerColor: "#E38577",
            label: "Music",
            directoryPath: "",
            fileListEmptyStateDescription:
              "Add music files from your computer and they'll transfer to your device automatically.",
            supportedFileTypes: [],
            size: "0 KB",
            count: 0,
          },
          {
            id: "imageFiles",
            icon: IconType.PhotoCatalog,
            markerColor: "#0E7490",
            label: "Photos",
            directoryPath: "",
            fileListEmptyStateDescription:
              "Add image files from your computer and they'll transfer to your device automatically.",
            supportedFileTypes: [],
            size: "0 KB",
            count: 0,
          },
          {
            id: "ebookFiles",
            icon: IconType.Book,
            markerColor: "#A8DADC",
            label: "E-books",
            directoryPath: "",
            fileListEmptyStateDescription:
              "Add E-book or PDF files from your computer and they'll transfer to your device automatically.",
            supportedFileTypes: [],
            size: "0 KB",
            count: 0,
          },
          {
            id: "applicationFiles",
            icon: IconType.Grid,
            markerColor: "#AEBEC9",
            label: "App Installers",
            directoryPath: "",
            fileListEmptyStateDescription:
              "Add app (.apk) files and install them from here. As Kompakt is a minimalist E-ink device some apps may not work correctly. This may happen due to the google services.",
            supportedFileTypes: [],
            size: "0 KB",
            count: 0,
          },
        ],
        segments: [
          {
            color: "#E38577",
            value: 1,
            minWidth: 24,
            label: "Music (0 KB)",
          },
          {
            color: "#0E7490",
            value: 1,
            minWidth: 24,
            label: "Photos (0 KB)",
          },
          {
            color: "#A8DADC",
            value: 1,
            minWidth: 24,
            label: "E-books (0 KB)",
          },
          {
            color: "#AEBEC9",
            value: 1,
            minWidth: 24,
            label: "App Installers (0 KB)",
          },
          {
            color: "#3B3F42",
            label: "Other files (N/A)",
            value: 1,
            minWidth: 24,
          },
          {
            color: "#F4F5F6",
            label: "Free (N/A)",
            value: 1,
            minWidth: 12,
          },
        ],
        otherSpaceBytes: 0,
        freeSpaceBytes: 0,
        usedSpaceBytes: 0,
      }
    }
    if (feature === DeviceManageFileFeature.Internal) {
      return mapDeviceToManageFiles({
        featureData: internalMemory,
        entitiesCountData: entitiesData,
      })
    } else {
      return mapDeviceToManageFiles({
        featureData: externalMemory,
        entitiesCountData: entitiesData,
      })
    }
  }, [entitiesData, externalMemory, feature, internalMemory, isConfigSuccess])

  return {
    data,
    isLoading,
    isConfigError,
    isConfigSuccess,
    isEntitiesError,
    isEntitiesSuccess,
    progress,
    refetch,
  }
}
