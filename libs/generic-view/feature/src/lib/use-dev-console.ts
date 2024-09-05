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
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useDevConsole = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)

  // Functions for internal testing
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && activeDeviceId) {
      if (typeof global !== "undefined") {
        Object.assign(global, {
          _getEntitiesData: (
            entityType: string,
            responseType: "json" | "file" = "json",
            deviceId = activeDeviceId
          ) => {
            return dispatch(
              getEntitiesDataAction({ entityType, deviceId, responseType })
            )
          },
          _getEntityDataAction: (
            entityType: string,
            entityId: string,
            responseType: "json" | "file" = "json",
            deviceId = activeDeviceId
          ) => {
            return dispatch(
              getEntityDataAction({
                entityType,
                entityId,
                deviceId,
                responseType,
              })
            )
          },
          _getEntitiesMetadata: (
            entityType: string,
            deviceId = activeDeviceId
          ) => {
            return dispatch(getEntitiesMetadataAction({ entityType, deviceId }))
          },
        })
      }
    }
  }, [activeDeviceId, dispatch])
}
