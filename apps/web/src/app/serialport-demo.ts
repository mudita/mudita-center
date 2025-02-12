/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { isEmpty } from "lodash"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { AppSerialPort, SerialPortError } from "app-serialport/renderer"
import { getApiConfig, getMenuConfig } from "api-device/feature"
import { ApiDeviceSerialPort } from "api-device/adapters"

export const useSerialPortListener = () => {
  const listenForDevicesChange = useCallback(async () => {
    const onAttach = async (device: SerialPortDeviceInfo) => {
      if (ApiDeviceSerialPort.isCompatible(device)) {
        try {
          const apiConfig = await getApiConfig(device)
          const menuConfig = await getMenuConfig(device)
          console.log(apiConfig, menuConfig)
        } catch (error) {
          if (error instanceof SerialPortError) {
            console.log(error.type, error.requestId)
          }
          // ApiDeviceError.ensure(error)
          // console.log(error.status, error.message, error.details)
        }
      }
      // else if (device.deviceType === SerialPortDeviceType.Pure) {
      //   console.log("Pure device attached", device)
      //
      //   const res = await AppSerialPort.request(device.path, {
      //     endpoint: 13,
      //     method: 1,
      //     body: {
      //       category: "phoneLockStatus",
      //     },
      //   })
      //   console.log(res)
      //
      //   const res2 = await AppSerialPort.request(device.path, {
      //     endpoint: 1,
      //     method: 1,
      //   })
      //   console.log(res2)
      // } else if (device.deviceType === SerialPortDeviceType.Harmony) {
      //   console.log("Harmony device attached", device)
      //
      //   const res = await AppSerialPort.request(device.path, {
      //     endpoint: 1,
      //     method: 1,
      //   })
      //   console.log(res)
      // }
    }

    AppSerialPort.onDevicesChanged((changes) => {
      console.log(changes)
      if (!isEmpty(changes.added)) {
        void onAttach(changes.added[0])
      }
    })
  }, [])

  useEffect(() => {
    void listenForDevicesChange()
  }, [listenForDevicesChange])
}
