/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"
import { AppSerialPort } from "app-serialport/renderer"

export const useSerialPortListener = () => {
  const interval = useRef<NodeJS.Timeout>()

  const listenPorts = useCallback(async () => {
    const ports = await AppSerialPort.list()

    await AppSerialPort.write(ports[0].path, "Hello from the web app!")
  }, [])

  useEffect(() => {
    void listenPorts()
    interval.current = setInterval(listenPorts, 2000)
    return () => clearInterval(interval.current)
  }, [listenPorts])
}
