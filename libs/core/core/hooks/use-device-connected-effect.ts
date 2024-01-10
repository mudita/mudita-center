/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { addDevice } from "Core/device-manager/actions/base.action"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
} from "Core/__deprecated__/renderer/constants/urls"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { configureDevice } from "Core/device-manager/actions/configure-device.action"

export const useDeviceConnectedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const discoveryDeviceInProgress = useSelector(isDiscoveryDeviceInProgress)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)

  const handleDeviceConnected = async (properties: DeviceBaseProperties) => {
    dispatch(addDevice(properties))
    dispatch(configureDevice(properties.id))

    if (activeDeviceId) {
      await handleActiveDevice(properties)
      return
    }

    if (shouldSkipProcessing()) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }

  const handleActiveDevice = async (properties: DeviceBaseProperties) => {
    if (activeDeviceId === properties.id) {
      await setActiveDeviceAndNavigate(properties.id)
      return
    }

    await handleActiveDeviceWorkaround(properties)
  }

  const setActiveDeviceAndNavigate = async (deviceId: string) => {
    await dispatch(setActiveDevice(deviceId))
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
    history.push(URL_DEVICE_INITIALIZATION.root)
  }

  const handleActiveDeviceWorkaround = async (
    properties: DeviceBaseProperties
  ) => {
    if (
      activeDeviceProcessing &&
      properties.serialNumber === "00000000000000"
    ) {
      await setActiveDeviceAndNavigate(properties.id)
    }
  }

  const shouldSkipProcessing = () => {
    return (
      discoveryDeviceInProgress ||
      initializationDeviceInProgress ||
      initializationAppInProgress
    )
  }

  useEffect(() => {
    const handler = async (properties: DeviceBaseProperties) => {
      await handleDeviceConnected(properties)
    }

    const deviceConnected = registerDeviceConnectedListener(handler)
    return () => {
      deviceConnected()
    }
  }, [handleDeviceConnected])
}
