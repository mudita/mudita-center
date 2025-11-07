/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getOutbox } from "../api/get-outbox"
import {
  ApiDevice,
  EntityData,
  GetEntitiesConfigResponse,
} from "devices/api-device/models"
import { useCallback, useEffect, useMemo } from "react"
import { useApiFeatureQuery } from "./use-api-feature.query"
import { useApiEntitiesDataQuery } from "./use-api-entities-data.query"
import { useApiEntitiesConfigQuery } from "./use-api-entities-config.query"
import { getEntityData } from "../api/get-entity-data"
import { cloneDeep } from "lodash"

export const useOutboxQuery = (device?: ApiDevice, enabled?: boolean) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: useOutboxQuery.queryKey(device?.id),
    queryFn: () => {
      if (!device) {
        return null
      }
      return getOutbox(device)
    },
    refetchInterval: 2_000,
    refetchIntervalInBackground: true,
    enabled: !!device && enabled,
  })

  const features = useMemo(() => {
    if (query.data?.ok) {
      return query.data?.body.features
    }
    return []
  }, [query.data])

  const featuresData = useMemo(() => {
    if (query.data?.ok) {
      return query.data?.body.data
    }
    return []
  }, [query.data])

  const entities = useMemo(() => {
    if (query.data?.ok) {
      return query.data?.body.entities
    }
    return []
  }, [query.data])

  const updateFeatureConfig = useCallback(
    (feature: string) => {
      const queryKey = useApiFeatureQuery.queryKey(feature, device?.id)
      void queryClient.invalidateQueries({
        queryKey,
      })
    },
    [device?.id, queryClient]
  )

  const updateFeatureData = useCallback(
    async (dataType: string) => {
      if (!device) {
        return
      }
      const queryKey = useApiEntitiesDataQuery.queryKey(dataType, device.id)
      await queryClient.invalidateQueries({ queryKey })
    },
    [device, queryClient]
  )

  const updateEntities = useCallback(
    async (entity: (typeof entities)[number]) => {
      if (!device) {
        return
      }
      const queryKey = useApiEntitiesDataQuery.queryKey(
        entity.entityType,
        device.id
      )
      const config = queryClient.getQueryData<GetEntitiesConfigResponse>(
        useApiEntitiesConfigQuery.queryKey(entity.entityType, device.id)
      )
      const [idFieldName] =
        Object.entries(config?.fields || {}).find(([, { type }]) => {
          return type === "id"
        }) || []

      if (!idFieldName || !("entityId" in entity)) {
        await queryClient.invalidateQueries({ queryKey })
        return
      }

      if (entity.action === "deleted") {
        queryClient.setQueryData(queryKey, (oldData: EntityData[] = []) => {
          return cloneDeep(oldData).filter(
            (item) => item[idFieldName] !== entity.entityId
          )
        })
      }

      if (entity.action === "modified") {
        const entityDataResponse = await getEntityData(
          device,
          entity.entityType,
          entity.entityId
        )
        if (!entityDataResponse.ok) {
          void queryClient.invalidateQueries({ queryKey })
          return
        }
        const entityData = entityDataResponse.body.data
        queryClient.setQueryData(queryKey, (oldData: EntityData[] = []) => {
          const nextData = cloneDeep(oldData)
          const existingIndex = nextData.findIndex(
            (item) => item[idFieldName] === entity.entityId
          )
          if (existingIndex >= 0) {
            nextData[existingIndex] = entityData
          } else {
            nextData.push(entityData)
          }
          return nextData
        })
      }
    },
    [device, queryClient]
  )

  useEffect(() => {
    for (const feature of features) {
      updateFeatureConfig(feature)
    }
  }, [features, updateFeatureConfig])

  useEffect(() => {
    for (const dataType of featuresData) {
      void updateFeatureData(dataType)
    }
  }, [featuresData, updateFeatureData])

  useEffect(() => {
    for (const entity of entities) {
      void updateEntities(entity)
    }
  }, [entities, updateEntities])
}

useOutboxQuery.queryKey = (deviceId?: string) => [deviceId, "outbox"]
