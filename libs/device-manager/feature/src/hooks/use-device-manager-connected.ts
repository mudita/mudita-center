/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain } from "shared/utils"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
  DeviceType,
} from "device-protocol/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { addDevice, configureDevice } from "core-device/feature"
import { getAPIConfig } from "generic-view/store"

const isCoreDevice = (deviceType: DeviceType): boolean => {
  return (
    deviceType === DeviceType.MuditaHarmony ||
    deviceType === DeviceType.MuditaPure
  )
}

export const useDeviceManagerConnected = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnected,
      (properties) => {
        const { id, deviceType } = properties
        if (deviceType === DeviceType.APIDevice) {
          dispatch(addDevice(properties))
          dispatch(getAPIConfig({ deviceId: id, retry: true }))
        } else if (deviceType === DeviceType.MuditaHarmonyMsc) {
          // TODO: add mds handler
          dispatch(addDevice(properties))
          dispatch(configureDevice(id))
        } else if (isCoreDevice(deviceType)) {
          dispatch(addDevice(properties))
          dispatch(configureDevice(id))
        }
      }
    )
  }, [dispatch])
}
