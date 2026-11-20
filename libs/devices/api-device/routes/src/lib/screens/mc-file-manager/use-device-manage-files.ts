/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useMemo, useState } from "react"
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
import { deviceManageFilesEmptyData } from "./use-device-manage-files-empty-data"

export const useDeviceManageFiles = (feature: DeviceManageFileFeatureId) => {
  const [isReloading, setIsReloading] = useState(false)
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const {
    data: storage,
    isLoading: isStorageLoading,
    isError: isStorageError,
    isSuccess: isConfigSuccess,
    refetch: refetchStorage,
  } = useApiFeatureQuery(feature, device)

  const categories = storage?.config?.main?.config?.categories
  const entitiesTypes = useMemo(
    () => uniq(categories?.map((category) => category.entityType) ?? []),
    [categories]
  )

  const {
    data: entitiesData,
    isLoading: isEntitiesLoading,
    isError: isEntitiesError,
    isSuccess: isEntitiesSuccess,
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

  const isLoading = isStorageLoading || isEntitiesLoading || isReloading
  const isConfigError =
    isStorageError || (isConfigSuccess && !entitiesTypes.length)

  const refetch = useCallback(async () => {
    setIsReloading(true)
    try {
      await refetchStorage()
    } finally {
      setIsReloading(false)
    }
  }, [refetchStorage])

  const data = useMemo(() => {
    if (!isConfigSuccess || !entitiesTypes.length) {
      return deviceManageFilesEmptyData
    }
    return mapDeviceToManageFiles({
      featureData: storage,
      entitiesCountData: entitiesData,
    })
  }, [entitiesData, entitiesTypes.length, isConfigSuccess, storage])

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
