/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useDevices } from "../queries"
import { Device } from "devices/common/models"
import { useApiDeviceInitializer } from "./use-api-device-initializer"
import { useDevicesListener } from "./use-devices-listener"

export const DevicesInitializer: FunctionComponent = () => {
  useDevicesListener()
  const { data: devices = [] } = useDevices()

  return (
    <>
      {devices.map((device) => (
        <DeviceInitializer key={device.path} device={device} />
      ))}
    </>
  )
}

const DeviceInitializer: FunctionComponent<{ device: Device }> = ({
  device,
}) => {
  useApiDeviceInitializer(device)

  return null
}
