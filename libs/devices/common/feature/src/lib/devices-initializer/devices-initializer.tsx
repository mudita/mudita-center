/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useDevices } from "../queries"
import { useApiDeviceInitializer } from "./use-api-device-initializer"
import { useDevicesListener } from "./use-devices-listener"
import { useHarmonyInitializer } from "./use-harmony-initializer"
import { usePureInitializer } from "./use-pure-initializer"
import { Pure } from "devices/pure/models"
import { PureSerialPort } from "devices/pure/adapters"
import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { useHarmonyMscInitializer } from "./use-harmony-msc-initializer"
import { HarmonyMsc } from "devices/harmony-msc/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"

export const DevicesInitializer: FunctionComponent = () => {
  useDevicesListener()
  const { data: devices = [] } = useDevices()

  return (
    <>
      {devices.map((device) => {
        if (ApiDeviceSerialPort.isCompatible(device)) {
          return <ApiDeviceInitializer key={device.path} device={device} />
        }
        if (HarmonySerialPort.isCompatible(device)) {
          return <HarmonyInitializer key={device.path} device={device} />
        }
        if (PureSerialPort.isCompatible(device)) {
          return <PureInitializer key={device.path} device={device} />
        }
        if (HarmonyMscSerialPort.isCompatible(device)) {
          return <HarmonyMscInitializer key={device.path} device={device} />
        }
        return null
      })}
    </>
  )
}

const ApiDeviceInitializer: FunctionComponent<{ device: ApiDevice }> = ({
  device,
}) => {
  useApiDeviceInitializer(device)
  return null
}

const PureInitializer: FunctionComponent<{ device: Pure }> = ({ device }) => {
  usePureInitializer(device)
  return null
}

const HarmonyInitializer: FunctionComponent<{ device: Harmony }> = ({
  device,
}) => {
  useHarmonyInitializer(device)
  return null
}

const HarmonyMscInitializer: FunctionComponent<{ device: HarmonyMsc }> = ({
  device,
}) => {
  useHarmonyMscInitializer(device)
  return null
}
