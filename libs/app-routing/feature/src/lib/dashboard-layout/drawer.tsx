/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { DevicesDrawer, DevicesDrawerCard } from "devices/common/ui"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {
  Device,
  selectDevicesDrawerVisibility,
  setDevicesDrawerVisibility,
  useActiveDevice,
  useDeviceActivate,
  useDeviceMetadata,
  useDevices,
} from "devices/common/feature"
import { DeviceMetadata, DevicesPaths } from "devices/common/models"

export const Drawer: FunctionComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: devices } = useDevices()
  const activateDevice = useDeviceActivate()
  const drawerVisible = useSelector(selectDevicesDrawerVisibility)

  const closeDrawer = useCallback(() => {
    dispatch(setDevicesDrawerVisibility(false))
  }, [dispatch])

  const selectDevice = useCallback(
    (deviceId: DeviceMetadata["id"]) => {
      const device = devices?.find((d) => d.path === deviceId)
      if (!device) {
        return
      }
      activateDevice(device)
      navigate({ pathname: DevicesPaths.Current })
      closeDrawer()
    },
    [activateDevice, closeDrawer, devices, navigate]
  )

  return (
    <DevicesDrawer opened={drawerVisible} onClose={closeDrawer}>
      {devices?.map((device) => {
        const select = () => {
          selectDevice(device.path)
        }
        return <Card key={device.path} {...device} onClick={select} />
      })}
    </DevicesDrawer>
  )
}

const Card: FunctionComponent<Device & { onClick: VoidFunction }> = ({
  onClick,
  ...device
}) => {
  const { data: metadata } = useDeviceMetadata(device)
  const { data: activeDevice } = useActiveDevice()

  if (!metadata) {
    return null
  }
  const isActive = activeDevice?.path === device.path

  return <DevicesDrawerCard {...metadata} onClick={onClick} active={isActive} />
}
