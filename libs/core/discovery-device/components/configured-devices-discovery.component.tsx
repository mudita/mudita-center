/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import {
  getAvailableDevicesSelector,
  getDevicesSelector,
  getFailedDevicesSelector,
  handleDeviceActivated,
} from "device-manager/feature"
import { DeviceType } from "device-protocol/models"
import { getAPIConfig } from "generic-view/store"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { useNoNewDevicesDetectedHook } from "Core/discovery-device/hooks/use-no-new-devices-detected.hook"
import { useFilteredRoutesHistory } from "shared/utils"

const ConfiguredDevicesDiscovery: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const devices = useSelector(getDevicesSelector)
  const failedDevices = useSelector(getFailedDevicesSelector)
  const availableDevices = useSelector(getAvailableDevicesSelector)
  const [pathToGoBack] = useFilteredRoutesHistory([
    URL_MAIN.root,
    ...Object.values(URL_ONBOARDING),
    ...Object.values(URL_DISCOVERY_DEVICE),
    ...Object.values(URL_DEVICE_INITIALIZATION),
  ])

  useEffect(() => {
    dispatch(setDiscoveryStatus(DiscoveryStatus.Discovering))
  }, [history, dispatch])

  const noNewDevicesDetectedState = useNoNewDevicesDetectedHook()

  useEffect(() => {
    if (!devices.length && !availableDevices.length) {
      if (
        pathToGoBack.startsWith(URL_MAIN.news) ||
        pathToGoBack.startsWith(URL_MAIN.help) ||
        pathToGoBack.startsWith(URL_MAIN.settings)
      ) {
        history.push(pathToGoBack)
      } else {
        history.push(URL_ONBOARDING.welcome)
      }
    }
  }, [availableDevices.length, devices.length, history, pathToGoBack])

  useEffect(() => {
    const handleDeviceActivation = async () => {
      if (
        devices.length === 1 &&
        failedDevices.length === 1 &&
        noNewDevicesDetectedState
      ) {
        if (devices[0].deviceType === DeviceType.APIDevice) {
          const getAPIConfigResult = await dispatch(
            getAPIConfig({ deviceId: devices[0].id })
          )
          await dispatch(handleDeviceActivated(devices[0].id))
          if (getAPIConfigResult.error !== undefined) {
            history.push(URL_ONBOARDING.troubleshooting)
          } else {
            history.push(URL_DEVICE_INITIALIZATION.root)
          }

          return
        } else {
          await dispatch(handleDeviceActivated(devices[0].id))
          history.push(URL_ONBOARDING.troubleshooting)
          return
        }
      }

      if (
        devices.length === 1 &&
        availableDevices.length === 1 &&
        noNewDevicesDetectedState
      ) {
        await dispatch(handleDeviceActivated(devices[0].id))
        history.push(URL_DEVICE_INITIALIZATION.root)
      }
    }

    void handleDeviceActivation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    history,
    dispatch,
    devices,
    failedDevices.length,
    availableDevices.length,
    noNewDevicesDetectedState,
  ])

  const isAnyDeviceAttachedOnInitialRender = useRef<boolean | undefined>(
    undefined
  )
  useEffect(() => {
    if (isAnyDeviceAttachedOnInitialRender.current !== undefined) {
      return
    }

    isAnyDeviceAttachedOnInitialRender.current = devices.length > 0
  }, [devices])

  useEffect(() => {
    if (
      !isAnyDeviceAttachedOnInitialRender.current &&
      noNewDevicesDetectedState
    ) {
      dispatch(setDiscoveryStatus(DiscoveryStatus.Idle))
      history.push(URL_ONBOARDING.root)
      return
    }

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
