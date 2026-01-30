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

  const isSuccess =
    isInternalMemorySuccess && isExternalMemorySuccess && isEntitiesSuccess
  const isLoading =
    isInternalMemoryLoading || isExternalMemoryLoading || isEntitiesLoading
  const isError =
    isInternalMemoryError || isExternalMemoryError || isEntitiesError

  const refetch = useCallback(async () => {
    await refetchInternalMemory()
    await refetchExternalMemory()
    await refetchEntities()
  }, [refetchEntities, refetchExternalMemory, refetchInternalMemory])

  const data = useMemo(() => {
    if (!isSuccess) {
      return {
        categories: [],
        segments: [],
        freeSpaceBytes: 0,
        usedSpaceBytes: 0,
        otherSpaceBytes: 0,
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
  }, [entitiesData, externalMemory, feature, internalMemory, isSuccess])

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    progress,
    refetch,
  }
}
