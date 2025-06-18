/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { DevicesDrawer, DevicesDrawerCard } from "devices/common/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  selectDevicesDrawerVisibility,
  setDevicesDrawerVisibility,
  useActiveDevice,
  useDeviceActivate,
  useDeviceMetadata,
  useDevices,
  useDeviceStatus,
} from "devices/common/feature"
import { Device, DeviceMetadata, DevicesPaths } from "devices/common/models"
import { useAppNavigate } from "app-routing/utils"

export const Drawer: FunctionComponent = () => {
  const dispatch = useDispatch()
  const navigate = useAppNavigate()
  const { data: devices } = useDevices()
  const activateDevice = useDeviceActivate()
  const drawerVisible = useSelector(selectDevicesDrawerVisibility)

  const closeDrawer = useCallback(() => {
    dispatch(setDevicesDrawerVisibility(false))
  }, [dispatch])

  const selectDevice = useCallback(
    async (deviceId: DeviceMetadata["id"]) => {
      const device = devices?.find((d) => d.path === deviceId)
      if (!device) {
        console.warn("Selected device not found:", deviceId)
        return
      }
      navigate({ pathname: DevicesPaths.Connecting })
      activateDevice(device)
      closeDrawer()
    },
    [activateDevice, closeDrawer, devices, navigate]
  )

  return (
    <DevicesDrawer opened={drawerVisible} onClose={closeDrawer}>
      {devices?.map((device) => {
        const select = () => {
          void selectDevice(device.path)
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
  const { data: status } = useDeviceStatus(device)

  if (!metadata) {
    return null
  }
  const isActive = activeDevice?.path === device.path

  return (
    <DevicesDrawerCard
      {...metadata}
      onClick={onClick}
      active={isActive}
      status={status || undefined}
    />
  )
}
