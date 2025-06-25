/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect } from "react"
import { DevicesIndicator } from "devices/common/ui"
import {
  setDevicesDrawerVisibility,
  useActiveDevice,
  useDevices,
  useDevicesStatuses,
  useDeviceStatus,
} from "devices/common/feature"
import { useDispatch } from "react-redux"
import { DeviceStatus } from "devices/common/models"

export const MenuDevicesIndicator: FunctionComponent = () => {
  const dispatch = useDispatch()

  const { data: devices = [] } = useDevices()
  const { data: fakeActiveDevice } = useActiveDevice()

  const { data: activeDeviceStatus } = useDeviceStatus(
    fakeActiveDevice || undefined
  )
  const devicesStatuses = useDevicesStatuses(devices)

  const multipleDevicesConnected = devices.length > 1
  const singleDeviceConnected = devices.length === 1
  const activeDeviceLocked = activeDeviceStatus === DeviceStatus.Locked
  const activeDeviceNotInitialized =
    activeDeviceStatus !== DeviceStatus.Initialized
  const isLoading = devicesStatuses.some(
    (status) => status === DeviceStatus.Initializing
  )

  const isIndicatorVisible =
    multipleDevicesConnected ||
    (singleDeviceConnected &&
      (activeDeviceLocked || activeDeviceNotInitialized))

  const openDevicesDrawer = () => {
    dispatch(setDevicesDrawerVisibility(true))
  }

  useEffect(() => {
    if (!isIndicatorVisible) {
      dispatch(setDevicesDrawerVisibility(false))
    }
  }, [dispatch, isIndicatorVisible])

  return (
    <DevicesIndicator
      devicesCount={devices.length}
      visible={isIndicatorVisible}
      onClick={openDevicesDrawer}
      loading={isLoading}
    />
  )
}
