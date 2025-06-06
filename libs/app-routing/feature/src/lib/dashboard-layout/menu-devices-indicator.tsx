/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DevicesIndicator } from "devices/common/ui"
import {
  setDevicesDrawerVisibility,
  useDeviceMetadata,
  useDevices,
  useFakeActiveDevice,
} from "devices/common/feature"
import { useDispatch } from "react-redux"

export const MenuDevicesIndicator: FunctionComponent = () => {
  const dispatch = useDispatch()

  const { data: devices = [] } = useDevices()
  const fakeActiveDevice = useFakeActiveDevice()

  const { data: activeDeviceMetadata } = useDeviceMetadata(fakeActiveDevice)

  const isIndicatorVisible =
    devices.length > 1 || (devices.length === 1 && activeDeviceMetadata?.locked)

  const openDevicesDrawer = () => {
    dispatch(setDevicesDrawerVisibility(true))
  }

  return (
    <DevicesIndicator
      devicesCount={devices.length}
      visible={isIndicatorVisible}
      onClick={openDevicesDrawer}
    />
  )
}
