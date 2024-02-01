/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { getAvailableDevicesSelector } from "Core/device-manager/selectors/get-available-devices.selector"
import { getFailedDevicesSelector } from "Core/device-manager/selectors/get-failed-devices.selector"
import { useNoNewDevicesDetectedHook } from "Core/discovery-device/hooks/use-no-new-devices-detected.hook"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)
  const failedDevices = useSelector(getFailedDevicesSelector)
  const availableDevices = useSelector(getAvailableDevicesSelector)

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [history, dispatch])

  const noNewDevicesDetectedState = useNoNewDevicesDetectedHook()

  useEffect(() => {
    if (
      devices.length === 1 &&
      failedDevices.length === 1 &&
      noNewDevicesDetectedState
    ) {
      history.push(URL_ONBOARDING.troubleshooting)
      return
    }

    const handleDeviceActivation = async () => {
      await dispatch(handleDeviceActivated(devices[0].id))
      history.push(URL_DEVICE_INITIALIZATION.root)
    }

    if (
      devices.length === 1 &&
      availableDevices.length === 1 &&
      noNewDevicesDetectedState
    ) {
      void handleDeviceActivation()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    history,
    dispatch,
    devices,
    failedDevices.length,
    availableDevices.length,
    noNewDevicesDetectedState,
  ])

  useEffect(() => {
    if (devices.length === 0 && noNewDevicesDetectedState) {
      dispatch(setDiscoveryStatus(DiscoveryStatus.Aborted))
      history.push(URL_MAIN.news)
    }
  }, [dispatch, history, devices.length, noNewDevicesDetectedState])

  useEffect(() => {
    if (
      devices.length > 1 &&
      availableDevices.length === devices.length &&
      noNewDevicesDetectedState
    ) {
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    }
  }, [
    history,
    devices.length,
    availableDevices.length,
    noNewDevicesDetectedState,
  ])

  return <ConnectingContent />
}

export default ConfiguredDevicesDiscovery
