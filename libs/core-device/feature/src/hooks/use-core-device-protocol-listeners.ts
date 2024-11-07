/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import {
  DeviceProtocolMainEvent,
  DeviceType,
  DeviceBaseProperties,
} from "device-protocol/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { removeDevice } from "../actions"

export const useCoreDeviceProtocolListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const handleDevicesDetached = useHandleDevicesDetached()
  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    return answerMain(
      DeviceProtocolMainEvent.DeviceDetached,
      batchDeviceDetachedEvents
    )
  }, [dispatch, batchDeviceDetachedEvents])
}

const useHandleDevicesDetached = () => {
  const dispatch = useDispatch<Dispatch>()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      for (const event of deviceDetachedEvents) {
        const { deviceType } = event
        if (deviceType !== DeviceType.APIDevice) {
          dispatch(removeDevice(event))
        }
      }
    },
    [dispatch]
  )
}
