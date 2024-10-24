/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import {
  getEntitiesDataAction,
  getEntitiesMetadataAction,
  getEntityDataAction,
  selectActiveApiDeviceId,
  createEntityDataAction,
  updateEntityDataAction,
  deleteEntitiesDataAction,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { EntityData, EntityId } from "device/models"
import { contactsSeedData } from "./seed-data/contacts-seed-data"

export const useDevConsole = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)

  // Functions for internal testing
  useEffect(() => {
    if (
      process.env.DEV_TOOLS_SHORTCUT_ENABLED !== "1" ||
      activeDeviceId === undefined
    ) {
      return
    }

    if (typeof global !== "undefined") {
      Object.assign(global, {
        _seedDataMap: {
          contacts: contactsSeedData,
        },
        _getEntitiesData: (
          entitiesType: string,
          responseType: "json" | "file" = "json",
          deviceId = activeDeviceId
        ) => {
          return dispatch(
            getEntitiesDataAction({
              entitiesType,
              deviceId,
              responseType,
            })
          )
        },
        _getEntityData: (
          entitiesType: string,
          entityId: string,
          responseType: "json" | "file" = "json",
          deviceId = activeDeviceId
        ) => {
          return dispatch(
            getEntityDataAction({
              entitiesType,
              entityId,
              deviceId,
              responseType,
            })
          )
        },
        _getEntitiesMetadata: (
          entitiesType: string,
          deviceId = activeDeviceId
        ) => {
          return dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
        },
        _deleteEntitiesDataAction: (
          entitiesType: string,
          ids: EntityId[],
          deviceId = activeDeviceId
        ) => {
          return dispatch(
            deleteEntitiesDataAction({ entitiesType, ids, deviceId })
          )
        },
        _createEntityDataAction: (
          entitiesType: string,
          data: EntityData,
          deviceId = activeDeviceId
        ) => {
          return dispatch(
            createEntityDataAction({ entitiesType, data, deviceId })
          )
        },
        _updateEntityDataAction: (
          entitiesType: string,
          entityId: EntityId,
          data: EntityData,
          deviceId = activeDeviceId
        ) => {
          return dispatch(
            updateEntityDataAction({ entitiesType, entityId, data, deviceId })
          )
        },
        _createMultipleEntities: async (
          entitiesType: string,
          entities: EntityData[],
          deviceId = activeDeviceId
        ) => {
          for (const data of entities) {
            await dispatch(
              createEntityDataAction({ entitiesType, data, deviceId })
            )
            await dispatch(
              getEntitiesMetadataAction({ entitiesType, deviceId })
            )
          }
        },
      })
    }
  }, [activeDeviceId, dispatch])
}
