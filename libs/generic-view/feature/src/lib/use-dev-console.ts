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
  deleteEntityDataAction,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { EntityId } from "device/models"

export const useDevConsole = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)

  // Functions for internal testing
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && activeDeviceId) {
      if (typeof global !== "undefined") {
        Object.assign(global, {
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
            return dispatch(
              getEntitiesMetadataAction({ entitiesType, deviceId })
            )
          },
          _deleteEntityDataAction: (
            entitiesType: string,
            entityId: EntityId,
            deviceId = activeDeviceId
          ) => {
            return dispatch(
              deleteEntityDataAction({ entitiesType, entityId, deviceId })
            )
          },
        })
      }
    }
  }, [activeDeviceId, dispatch])
}
