/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { registerDeviceConnectFailedListener } from "Core/device-manager/listeners/device-connect-failed.listener"
import { addDevice } from "Core/device-manager/actions/base.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { DeviceState } from "Core/device-manager/reducers/device-manager.interface"

export const useDeviceConnectFailedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const discoveryDeviceInProgress = useSelector(isDiscoveryDeviceInProgress)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)
  const handleDeviceConnectFailed = async (
    properties: DeviceBaseProperties
  ) => {
    dispatch(addDevice({ ...properties, state: DeviceState.Failed }))

    if (shouldSkipProcessing()) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }

  const shouldSkipProcessing = () => {
    return (
      discoveryDeviceInProgress ||
      initializationDeviceInProgress ||
      initializationAppInProgress ||
      activeDeviceProcessing
    )
  }

  useEffect(() => {
    const handler = async (properties: DeviceBaseProperties) => {
      await handleDeviceConnectFailed(properties)
    }

    const deviceConnected = registerDeviceConnectFailedListener(handler)
    return () => {
      deviceConnected()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
