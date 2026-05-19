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

export const useDeviceManageFiles = <F extends DeviceManageFileFeatureId>(
  feature: F
) => {
  const [isReloading, setIsReloading] = useState(false)
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

  const internalMemoryCategories = useMemo(() => {
    return internalMemory?.config?.main?.config?.categories || []
  }, [internalMemory])
  const externalMemoryCategories = useMemo(() => {
    return externalMemory?.config?.main?.config?.categories || []
  }, [externalMemory])

  const entitiesTypes = useMemo(() => {
    return uniq([
      ...(internalMemoryCategories?.map((c) => c.entityType) || []),
      ...(externalMemoryCategories?.map((c) => c.entityType) || []),
    ])
  }, [externalMemoryCategories, internalMemoryCategories])

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
    isInternalMemoryLoading ||
    isExternalMemoryLoading ||
    isEntitiesLoading ||
    isReloading
  const isConfigError = isInternalMemoryError || isExternalMemoryError

  const refetch = useCallback(async () => {
    setIsReloading(true)
    await refetchInternalMemory()
    await refetchExternalMemory()
    await refetchEntities()
    setIsReloading(false)
  }, [refetchEntities, refetchExternalMemory, refetchInternalMemory])

  const data = useMemo(() => {
    if (!isConfigSuccess) {
      return deviceManageFilesEmptyData
    }
    if (feature === DeviceManageFileFeature.Internal) {
      if (!internalMemoryCategories.length) {
        return deviceManageFilesEmptyData
      }
      return mapDeviceToManageFiles({
        featureData: internalMemory,
        entitiesCountData: entitiesData,
      })
    } else {
      if (!externalMemoryCategories.length) {
        return deviceManageFilesEmptyData
      }
      return mapDeviceToManageFiles({
        featureData: externalMemory,
        entitiesCountData: entitiesData,
      })
    }
  }, [
    entitiesData,
    externalMemory,
    externalMemoryCategories.length,
    feature,
    internalMemory,
    internalMemoryCategories.length,
    isConfigSuccess,
  ])

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
