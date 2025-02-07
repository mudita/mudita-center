/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { isEmpty } from "lodash"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { AppSerialPort, AppSerialPortErrors } from "app-serialport/renderer"

export const useSerialPortListener = () => {
  const listenForDevicesChange = useCallback(async () => {
    const onAttach = async (device: SerialPortDeviceInfo) => {
      if (device.deviceType === SerialPortDeviceType.ApiDevice) {
        for (let i = 0; i < 50; i++) {
          const timeout = Math.random() * 1000
          try {
            if (i % 2 === 0) {
              const res = await AppSerialPort.request(device.path, {
                endpoint: "ENTITIES_CONFIGURATION",
                method: "GET",
                body: {
                  entityType: "contacts",
                },
                options: {
                  timeout,
                },
              })
              console.log(i, timeout, res)
            } else {
              const res = await AppSerialPort.request(device.path, {
                endpoint: "API_CONFIGURATION",
                method: "GET",
                body: {},
                options: {
                  timeout,
                },
              })
              console.log(i, timeout, res)
            }
          } catch (e) {
            if (e instanceof AppSerialPortErrors.ResponseTimeoutError) {
              console.log("Timeout error", i, timeout)
            }
          }
        }
      } else if (device.deviceType === SerialPortDeviceType.Pure) {
        console.log("Pure device attached", device)

        const res = await AppSerialPort.request(device.path, {
          endpoint: 13,
          method: 1,
          body: {
            category: "phoneLockStatus",
          },
        })
        console.log(res)

        const res2 = await AppSerialPort.request(device.path, {
          endpoint: 1,
          method: 1,
        })
        console.log(res2)
      } else if (device.deviceType === SerialPortDeviceType.Harmony) {
        console.log("Harmony device attached", device)

        const res = await AppSerialPort.request(device.path, {
          endpoint: 1,
          method: 1,
        })
        console.log(res)
      }
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
