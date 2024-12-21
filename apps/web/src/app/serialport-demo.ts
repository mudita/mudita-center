/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { isEmpty } from "lodash"
import { SerialPortDeviceInfo } from "app-serialport/models"
import { AppSerialPort } from "app-serialport/renderer"

export const useSerialPortListener = () => {
  const listenForDevicesChange = useCallback(async () => {
    const onAttach = async (device: SerialPortDeviceInfo) => {
      const resp1 = await AppSerialPort.request(device.path, {
        endpoint: "API_CONFIGURATION",
        method: "GET",
        body: {},
        options: {
          connectionTimeOut: 30000,
        },
      })
      console.log(resp1)

      const resp2 = await AppSerialPort.request(device.path, {
        endpoint: "ENTITIES_CONFIGURATION",
        method: "GET",
        body: {
          entityType: "contacts",
        },
        options: {
          connectionTimeOut: 30000,
        },
      })
      console.log(resp2)

      const resp3 = await AppSerialPort.request(device.path, {
        endpoint: "ENTITIES_DATA",
        method: "GET",
        body: {
          entityType: "contacts",
          responseType: "json",
        },
        options: {
          connectionTimeOut: 30000,
        },
      })
      console.log(resp3)
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
