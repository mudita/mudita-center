/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useAppNavigate } from "app-routing/utils"
import {
  useDeviceActivate,
  useDeviceMetadataQuery,
  useDevicesQuery,
  useDeviceStatusQuery,
} from "devices/common/feature"
import { Device, DeviceMetadata, DevicesPaths } from "devices/common/models"
import { DevicesSelector, DevicesSelectorCard } from "devices/common/ui"

export const DevicesSelectingPage: FunctionComponent = () => {
  const navigate = useAppNavigate()
  const { data: devices = [] } = useDevicesQuery()
  const activateDevice = useDeviceActivate()

  const selectDevice = useCallback(
    (deviceId: DeviceMetadata["id"]) => {
      const device = devices?.find((d) => d.path === deviceId)
      if (!device) {
        return
      }
      navigate({ pathname: DevicesPaths.Connecting })
      activateDevice(device)
    },
    [activateDevice, devices, navigate]
  )

  if (devices.length === 0) {
    return null
  }

  return (
    <DevicesSelector>
      {devices.map((device) => {
        const select = () => {
          selectDevice(device.path)
        }
        return <Card key={device.path} {...device} onClick={select} />
      })}
    </DevicesSelector>
  )
}

const Card: FunctionComponent<Device & { onClick: VoidFunction }> = ({
  onClick,
  ...device
}) => {
  const { data: metadata } = useDeviceMetadataQuery(device)
  const { data: status } = useDeviceStatusQuery(device)

  if (!metadata) {
    return null
  }

  return (
    <DevicesSelectorCard
      {...metadata}
      onClick={onClick}
      status={status || undefined}
    />
  )
}
