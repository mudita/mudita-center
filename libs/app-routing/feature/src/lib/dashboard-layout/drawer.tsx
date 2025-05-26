/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { Device, DevicesDrawer } from "devices/common/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  mapDeviceInfo,
  selectConnectedDevices,
  selectCurrentDevice,
  selectDrawerVisibility,
  setCurrentDevice,
  setDrawerVisibility,
} from "devices/common/feature"

export const Drawer: FunctionComponent = () => {
  const dispatch = useDispatch()
  const drawerVisible = useSelector(selectDrawerVisibility)
  const connectedDevices = useSelector(selectConnectedDevices)
  const activeDevice = useSelector(selectCurrentDevice)

  const closeDrawer = () => {
    dispatch(setDrawerVisibility(false))
  }

  const selectDevice = (deviceId: Device["id"]) => {
    dispatch(setCurrentDevice(deviceId))
  }

  const devices = useMemo(() => {
    return connectedDevices.map(mapDeviceInfo).filter(Boolean) as Device[]
  }, [connectedDevices])

  return (
    <DevicesDrawer
      devices={devices}
      opened={drawerVisible}
      activeDeviceId={activeDevice?.path}
      onClose={closeDrawer}
      onSelect={selectDevice}
    />
  )
}
