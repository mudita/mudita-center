/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import { DeviceState } from "device-manager/models"
import {
  DeviceProtocolMainEvent,
  DeviceType,
  DeviceBaseProperties,
} from "device-protocol/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { addDevice, removeDevice } from "../actions"
import { getDeviceConfigurationRequest } from "../requests"

export const useCoreDeviceProtocolListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const handleDevicesDetached = useHandleDevicesDetached()
  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      async (properties) => {
        const { deviceType } = properties
        if (deviceType === DeviceType.APIDevice) {
          return
        }

        const result = await getDeviceConfigurationRequest(properties.id)
        const caseColour = result.ok ? result.data.caseColour : undefined

        dispatch(
          addDevice({ ...properties, caseColour, state: DeviceState.Failed })
        )
      }
    )
  }, [dispatch])

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
