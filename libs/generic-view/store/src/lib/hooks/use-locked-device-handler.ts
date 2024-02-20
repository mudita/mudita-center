/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { useDispatch, useSelector } from "react-redux"
import {
  selectActiveDevice,
  selectActiveDeviceFeatures,
  selectApiError,
} from "../selectors"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ApiError } from "device/models"
import { getAPIConfig } from "../get-api-config"

export const useLockedDeviceHandler = () => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveDevice)
  const deviceLocked = useSelector((state: ReduxRootState) => {
    return selectApiError(state, ApiError.DeviceLocked)
  })
  const features = useSelector(selectActiveDeviceFeatures)

  useEffect(() => {
    if (!deviceLocked && deviceId && !features) {
      dispatch(getAPIConfig({ deviceId }))
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )
    }
  }, [deviceId, deviceLocked, dispatch, features])
}
