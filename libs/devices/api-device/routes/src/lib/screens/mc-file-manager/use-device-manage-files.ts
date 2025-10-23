/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useMemo } from "react"
import { ApiDevice } from "devices/api-device/models"
import {
  useApiEntitiesDataMapQuery,
  useApiFeaturesQuery,
} from "devices/api-device/feature"
import {
  DeviceManageFilesData,
  mapDeviceToManageFiles,
} from "./map-to-device-manage-files-data"
import {
  DeviceManageFileFeature,
  DeviceManageFileFeatureId,
} from "./device-manage-files.types"

interface DeviceManageFilesDataViewData extends DeviceManageFilesData {
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

export const useDeviceManageFiles = (
  feature: DeviceManageFileFeatureId,
  device?: ApiDevice
): DeviceManageFilesDataViewData => {
  const {
    data: featuresData,
    isLoading: isFeatureLoading,
    isError: isFeatureError,
    refetch: refetchFeatureData,
  } = useApiFeaturesQuery(
    // Preload both internal and external file manager features to avoid loading states when switching between them
    [DeviceManageFileFeature.Internal, DeviceManageFileFeature.External],
    device
  )

  const featureData = useMemo(() => {
    return featuresData[feature]
  }, [featuresData, feature])

  const categories = featureData?.config?.main.config.categories || []
  const types = categories
    .map(({ entityType }) => entityType)
    .filter((entityType) => entityType !== "otherFiles")

  const {
    data: entitiesData,
    isLoading: isEntitiesLoading,
    isError: isEntitiesError,
    refetch: refetchEntities,
  } = useApiEntitiesDataMapQuery(types, device)

  const isError = isFeatureError || isEntitiesError
  const isLoading = isFeatureLoading || isEntitiesLoading

  const data = useMemo<DeviceManageFilesData>(() => {
    if (!device || !featureData || isLoading || isError) {
      return mapDeviceToManageFiles()
    }

    return mapDeviceToManageFiles({
      featureData,
      entitiesData,
    })
  }, [device, featureData, isLoading, isError, entitiesData])

  const refetch = useCallback(async () => {
    await Promise.all([refetchFeatureData(), refetchEntities()])
  }, [refetchEntities, refetchFeatureData])

  return {
    ...data,
    isError,
    isLoading,
    refetch,
  }
}
