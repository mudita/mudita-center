/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { selectActiveDeviceFeatures } from "../selectors/active-device-features"
import { selectApiError } from "../selectors/api-error"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ApiError } from "device/models"
import { getAPIConfig } from "../get-api-config"

export const useLockedDeviceHandler = () => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)
  const deviceLocked = useSelector((state: ReduxRootState) =>
    deviceId ? selectApiError(state, deviceId, ApiError.DeviceLocked) : false
  )
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
