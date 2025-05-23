/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import { useEffect } from "react"
import { useDispatch, useStore } from "react-redux"
import { setConnectedDevices } from "./store/devices.actions"
import { selectCurrentDevice } from "./store/devices.selectors"
import { AppState } from "app-store/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { AppDeviceInfo } from "devices/common/models"
import { getApiConfig } from "devices/api-device/feature"
import { PureSerialPort } from "devices/pure/adapters"
import { getPureInfo } from "devices/pure/feature"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { getHarmonyInfo } from "devices/harmony/feature"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"
import { flashHarmonyMsc } from "devices/harmony-msc/feature"

export const useDevicesListener = () => {
  const store = useStore<AppState>()
  const dispatch = useDispatch()

  useEffect(() => {
    AppSerialPort.onDevicesChanged(async (changed) => {
      const currentDevice = selectCurrentDevice(store.getState())
      const connectedDevices: AppDeviceInfo[] = []

      for (const device of changed.all) {
        const active =
          currentDevice?.path === device.path || changed.all.length === 1
        let deviceMetadata:
          | Awaited<ReturnType<typeof getApiConfig>>
          | Awaited<ReturnType<typeof getPureInfo>>
          | Awaited<ReturnType<typeof getHarmonyInfo>>
          | Awaited<ReturnType<typeof flashHarmonyMsc>>
          | undefined = undefined

        if (ApiDeviceSerialPort.isCompatible(device)) {
          deviceMetadata = await getApiConfig(device)
        } else if (PureSerialPort.isCompatible(device)) {
          deviceMetadata = await getPureInfo(device)
        } else if (HarmonySerialPort.isCompatible(device)) {
          deviceMetadata = await getHarmonyInfo(device)
        } else if (HarmonyMscSerialPort.isCompatible(device)) {
          connectedDevices.push({
            ...device,
            active,
            metadata: undefined,
          })
        }

        if (deviceMetadata && deviceMetadata.ok) {
          connectedDevices.push({
            ...device,
            active,
            metadata: deviceMetadata.body as never,
          })
        }
      }

      dispatch(setConnectedDevices(connectedDevices))
    })
  }, [dispatch, store])
}
