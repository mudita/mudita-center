/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { answerMain } from "shared/utils"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
  DeviceType,
} from "device-protocol/models"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { DeviceState } from "device-manager/models"
import {
  addDevice,
  addDevice as addCoreDevice,
  getDeviceConfigurationRequest,
} from "core-device/feature"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { isCoreDevice } from "../helpers"

export const useDeviceManagerConnectFailed = () => {
  const dispatch = useDispatch<Dispatch>()

  const history = useHistory()
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const discoveryDeviceInProgress = useSelector(isDiscoveryDeviceInProgress)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)

  const shouldSkipProcessing = useCallback(() => {
    return (
      discoveryDeviceInProgress ||
      initializationDeviceInProgress ||
      initializationAppInProgress ||
      activeDeviceProcessing
    )
  }, [
    discoveryDeviceInProgress,
    initializationDeviceInProgress,
    initializationAppInProgress,
    activeDeviceProcessing,
  ])

  const handleDeviceConnectFailed = useCallback(async () => {
    if (activeDeviceId) {
      return
    }

    if (shouldSkipProcessing()) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }, [activeDeviceId, shouldSkipProcessing, history])

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      async (properties) => {
        const { deviceType } = properties

        if (deviceType === DeviceType.APIDevice) {
          dispatch(addDevice({ ...properties, state: DeviceState.Failed }))
        } else if (deviceType === DeviceType.MuditaHarmonyMsc) {
          dispatch(
            addCoreDevice({
              ...properties,
              caseColour: undefined,
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

        await handleDeviceConnectFailed()
      }
    )
  }, [dispatch, handleDeviceConnectFailed])
}
