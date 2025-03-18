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

        if (ApiDeviceSerialPort.isCompatible(device)) {
          const apiConfig = await getApiConfig(device)

          if (apiConfig.ok) {
            connectedDevices.push({
              ...device,
              active,
              metadata: apiConfig.body,
            })
          }
        } else {
          connectedDevices.push({
            ...device,
            active: active,
            metadata: {},
          } as AppDeviceInfo)
        }
      }

      dispatch(setConnectedDevices(connectedDevices))
    })
  }, [dispatch, store])
}
