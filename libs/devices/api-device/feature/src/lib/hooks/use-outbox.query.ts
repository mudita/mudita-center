/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getOutbox } from "../api/get-outbox"
import {
  ApiDevice,
  ApiDeviceErrorType,
  DetailedOutboxEntity,
  EntityData,
  GetEntitiesConfigResponse,
  OutboxResponse,
  SimpleOutboxEntity,
} from "devices/api-device/models"
import { useCallback, useEffect, useRef } from "react"
import { useApiEntitiesDataQuery } from "./use-api-entities-data.query"
import { useApiEntitiesConfigQuery } from "./use-api-entities-config.query"
import { getEntityData } from "../api/get-entity-data"
import { cloneDeep, groupBy, uniq } from "lodash"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import {
  DeviceErrorType,
  DevicesQueryKeys,
  DeviceStatus,
} from "devices/common/models"

export const useOutboxQuery = (device?: ApiDevice, enabled?: boolean) => {
  const queryClient = useQueryClient()
  const modifiedEntitiesQueueRef = useRef<DetailedOutboxEntity[]>([])
  const modifiedEntitiesLastProcessTimeRef = useRef(0)

  const query = useQuery<
    Awaited<ReturnType<typeof getOutbox>> | null,
    DeviceErrorType | ApiDeviceErrorType
  >({
    queryKey: useOutboxQuery.queryKey(device?.id),
    queryFn: async () => {
      if (!device) {
        return null
      }
      const outbox = await getOutbox(device)
      if (!outbox.ok) {
        throw outbox.status
      }
      return outbox
    },
    retry: 4,
    retryDelay: 2000,
    refetchInterval: (response) => {
      const data = response.state.data
      const hasEntities = data?.ok && data.body.entities.length > 0

      const currentTransfer = queryClient.getMutationCache().find({
        mutationKey: ["fileTransfer", device?.id],
        status: "pending",
        exact: false,
      })
      const isCurrentlyUploading =
        currentTransfer?.state.variables.actionType === "Upload"

      if (hasEntities && !isCurrentlyUploading) {
        return 50
      }

      return 2_000
    },
    refetchIntervalInBackground: true,
    staleTime: 0,
    gcTime: 0,
    enabled: !!device && enabled,
  })

  const updateFeature = useCallback(
    async (feature: string) => {
      const queryKey = apiDeviceQueryKeys.feature(feature, device?.id)
      await queryClient.invalidateQueries({ queryKey })
    },
    [device?.id, queryClient]
  )

  const processEntitiesDelete = useCallback(
    async (deletedEntities: DetailedOutboxEntity[]) => {
      if (!device) {
        return
      }
      const entitiesByType = groupBy(deletedEntities, "entityType")

      for (const [entityType, entities] of Object.entries(entitiesByType)) {
        const queryKey = useApiEntitiesDataQuery.queryKey(entityType, device.id)
        const config = queryClient.getQueryData<GetEntitiesConfigResponse>(
          useApiEntitiesConfigQuery.queryKey(entityType, device.id)
        )
        const [idFieldName] =
          Object.entries(config?.fields || {}).find(([, { type }]) => {
            return type === "id"
          }) || []

        if (!idFieldName) {
          continue
        }

        const existingData =
          queryClient.getQueryData<EntityData[]>(queryKey) || []

        const entitiesToDelete: DetailedOutboxEntity[] = []

        for (const entity of entities) {
          const entityExistsInGivenType = existingData.some((item) => {
            return item[idFieldName] === entity.entityId
          })
          if (entityExistsInGivenType) {
            entitiesToDelete.push(entity)
          }
        }

        queryClient.setQueryData(queryKey, (oldData: EntityData[] = []) => {
          return cloneDeep(oldData).filter((item) => {
            return !entitiesToDelete.some(
              (entity) => item[idFieldName] === entity.entityId
            )
          })
        })
      }
    },
    [device, queryClient]
  )

  const processEntitiesModification = useCallback(async () => {
    if (!device) {
      return
    }

    const modifiedEntities = modifiedEntitiesQueueRef.current
    const timeSinceLastProcess =
      Date.now() - modifiedEntitiesLastProcessTimeRef.current

    // Collect modifications for at least 1.5s before processing
    if (
      timeSinceLastProcess < 1500 ||
      modifiedEntitiesLastProcessTimeRef.current === 0
    ) {
      modifiedEntitiesLastProcessTimeRef.current = Date.now()
      return
    }

    const entitiesByType = groupBy(modifiedEntities, "entityType")

    for (const [entityType, entities] of Object.entries(entitiesByType)) {
      const queryKey = useApiEntitiesDataQuery.queryKey(entityType, device.id)
      const config = queryClient.getQueryData<GetEntitiesConfigResponse>(
        useApiEntitiesConfigQuery.queryKey(entityType, device.id)
      )
      const [idFieldName] =
        Object.entries(config?.fields || {}).find(([, { type }]) => {
          return type === "id"
        }) || []

      if (!idFieldName) {
        continue
      }

      const existingData = queryClient.getQueryData<EntityData[]>(queryKey)

      if (!existingData) {
        continue
      }

      if (entities.length <= 10) {
        for (const entity of entities) {
          const entityDataResponse = await getEntityData(
            device,
            entity.entityType,
            entity.entityId
          )
          if (!entityDataResponse.ok) {
            continue
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
      } else {
        await queryClient.invalidateQueries({ queryKey })
      }
    }
    modifiedEntitiesQueueRef.current = []
    modifiedEntitiesLastProcessTimeRef.current = 0
  }, [device, queryClient])

  const processEntitiesUnknownAction = useCallback(
    async (unknownEntities: SimpleOutboxEntity[]) => {
      if (!device) {
        return
      }
      const entitiesByType = groupBy(unknownEntities, "entityType")
      for (const entityType of Object.keys(entitiesByType)) {
        const queryKey = useApiEntitiesDataQuery.queryKey(entityType, device.id)
        await queryClient.invalidateQueries({ queryKey })
      }
    },
    [device, queryClient]
  )

  const processEntitiesChanges = useCallback(
    async (changedEntities: OutboxResponse["entities"]) => {
      if (!device) {
        return
      }
      const modified = changedEntities.filter(
        (entity): entity is DetailedOutboxEntity => {
          return "action" in entity && entity.action === "modified"
        }
      )
      const deleted = changedEntities.filter(
        (entity): entity is DetailedOutboxEntity =>
          "action" in entity && entity.action === "deleted"
      )
      const unknown = changedEntities.filter(
        (entity): entity is SimpleOutboxEntity => !("action" in entity)
      )

      if (deleted.length > 0) {
        void processEntitiesDelete(deleted)
      }

      if (modified.length > 0 || modifiedEntitiesQueueRef.current.length > 0) {
        modifiedEntitiesQueueRef.current.push(...modified)
        await processEntitiesModification()
      }

      if (unknown.length > 0) {
        await processEntitiesUnknownAction(unknown)
      }
    },
    [
      device,
      processEntitiesDelete,
      processEntitiesModification,
      processEntitiesUnknownAction,
    ]
  )

  useEffect(() => {
    if (query.isError) {
      let status: DeviceStatus | undefined = undefined

      switch (query.error) {
        case ApiDeviceErrorType.DeviceLocked:
          status = DeviceStatus.Locked
          break
        case ApiDeviceErrorType.DeviceInternalError:
        case DeviceErrorType.Critical:
        case DeviceErrorType.RequestParsingFailed:
        case DeviceErrorType.ResponseParsingFailed:
          status = DeviceStatus.CriticalError
          break
      }
      if (status) {
        queryClient.setQueryData(
          [DevicesQueryKeys.All, device?.id, "status"],
          status
        )
      }
    }
  }, [device?.id, query.error, query.isError, queryClient])

  useEffect(() => {
    if (!query.data?.ok) {
      return
    }
    const { data, entities, features } = query.data.body

    void processEntitiesChanges(entities)

    for (const feature of uniq([...features, ...data])) {
      void updateFeature(feature)
    }
  }, [query.data, query.isRefetching, processEntitiesChanges, updateFeature])
}

useOutboxQuery.queryKey = (deviceId?: string) => [
  DevicesQueryKeys.All,
  deviceId,
  "outbox",
]
