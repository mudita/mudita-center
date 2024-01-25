/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useCallback } from "react"
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
import { DeviceType } from "Core/device"
import { getTmpMuditaHarmonyPortInfoSelector } from "Core/update/selectors/get-tmp-mudita-harmony-port-info-selector"
import { isUnknownSerialNumber } from "Core/device/constants/unknown-serial-number.constant"
import { getDeviceConfigurationRequest } from "Core/device-manager/requests/get-device-configuration.request"

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
  const tmpMuditaHarmonyPortInfo = useSelector(
    getTmpMuditaHarmonyPortInfoSelector
  )

  const shouldSkipProcessing = useCallback(() => {
    return (
      discoveryDeviceInProgress ||
      initializationDeviceInProgress ||
      initializationAppInProgress
    )
  }, [
    discoveryDeviceInProgress,
    initializationDeviceInProgress,
    initializationAppInProgress,
  ])

  const setActiveDeviceAndNavigate = useCallback(
    async (deviceId: string) => {
      await dispatch(setActiveDevice(deviceId))
      dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
      history.push(URL_DEVICE_INITIALIZATION.root)
    },
    [dispatch, history]
  )

  /**
   * Workaround for restarting Mudita Harmony device during the update process,
   * when the serial number is "00000000000000". Applicable to Mudita Harmony versions
   * below 1.8.2, addressing the described issue.
   */
  const handleActiveDeviceWorkaround = useCallback(
    async (properties: DeviceBaseProperties) => {
      if (!activeDeviceProcessing) {
        return
      }

      if (properties.deviceType !== DeviceType.MuditaHarmony) {
        return
      }

      if (tmpMuditaHarmonyPortInfo === undefined) {
        return
      }

      const { locationId, serialNumber } = tmpMuditaHarmonyPortInfo
      // Windows & Mac workaround
      if (locationId !== undefined) {
        if (properties.locationId === locationId) {
          await setActiveDeviceAndNavigate(properties.id)
        }

        return
      }

      // Linux (without handle multi)
      if (isUnknownSerialNumber(serialNumber)) {
        await setActiveDeviceAndNavigate(properties.id)
      }

      const result = await getDeviceConfigurationRequest(properties.id)

      if (result.ok && result.data.serialNumber === serialNumber) {
        await setActiveDeviceAndNavigate(properties.id)
      }
    },
    [
      activeDeviceProcessing,
      setActiveDeviceAndNavigate,
      tmpMuditaHarmonyPortInfo,
    ]
  )

  const handleActiveDevice = useCallback(
    async (properties: DeviceBaseProperties) => {
      if (activeDeviceId === properties.id) {
        await setActiveDeviceAndNavigate(properties.id)
        return
      }

      await handleActiveDeviceWorkaround(properties)
    },
    [activeDeviceId, setActiveDeviceAndNavigate, handleActiveDeviceWorkaround]
  )

  const handleDeviceConnected = useCallback(
    async (properties: DeviceBaseProperties) => {
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
    },
    [
      dispatch,
      activeDeviceId,
      handleActiveDevice,
      shouldSkipProcessing,
      history,
    ]
  )

  useEffect(() => {
    const handler = async (properties: DeviceBaseProperties) => {
      await handleDeviceConnected(properties)
    }

    const unregister = registerDeviceConnectedListener(handler)
    return () => {
      unregister()
    }
  }, [handleDeviceConnected])
}
