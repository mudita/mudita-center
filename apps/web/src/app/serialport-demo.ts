/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { isEmpty } from "lodash"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { AppSerialPort, AppSerialPortErrors } from "app-serialport/renderer"

export const useSerialPortListener = () => {
  const listenForDevicesChange = useCallback(async () => {
    const onAttach = async (device: SerialPortDeviceInfo) => {
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
