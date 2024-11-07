/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { answerMain } from "shared/utils"
import { useDispatch } from "react-redux"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
  DeviceType,
} from "device-protocol/models"
import {
  addDevice,
  addDevice as addCoreDevice,
  getDeviceConfigurationRequest,
} from "core-device/feature"
import { DeviceState } from "device-manager/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { isCoreDevice } from "../helpers"

export const useDeviceManagerConnectFailed = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      async (properties) => {
        const { deviceType } = properties
        if (deviceType === DeviceType.APIDevice) {
          dispatch(addDevice({ ...properties, state: DeviceState.Failed }))
        } else if (deviceType === DeviceType.MuditaHarmonyMsc) {
          // TODO: add mds handler
          const result = await getDeviceConfigurationRequest(properties.id)
          const caseColour = result.ok ? result.data.caseColour : undefined

          dispatch(
            addCoreDevice({
              ...properties,
              caseColour,
              state: DeviceState.Failed,
            })
          )
        } else if (isCoreDevice(deviceType)) {
          const result = await getDeviceConfigurationRequest(properties.id)
          const caseColour = result.ok ? result.data.caseColour : undefined

          dispatch(
            addCoreDevice({
              ...properties,
              caseColour,
              state: DeviceState.Failed,
            })
          )
        }
      }
    )
  }, [dispatch])
}
