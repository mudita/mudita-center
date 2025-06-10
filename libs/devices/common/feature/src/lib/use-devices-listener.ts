/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import { useLayoutEffect } from "react"
import { useDeviceAttach, useDeviceDetach } from "./queries"

export const useDevicesListener = () => {
  const attachDevice = useDeviceAttach()
  const detachDevice = useDeviceDetach()

  useLayoutEffect(() => {
    AppSerialPort.onDevicesChanged(async ({ removed, added }) => {
      for (const device of removed) {
        detachDevice(device.path)
      }
      for (const device of added) {
        void attachDevice(device)
      }
    })
  }, [attachDevice, detachDevice])
}
