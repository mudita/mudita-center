/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"
import { SerialPort } from "@modules/serialport"

export const useSerialPortListener = () => {
  const interval = useRef<NodeJS.Timeout>()

  const listenPorts = useCallback(async () => {
    const ports = await SerialPort.list()
    console.log(ports)
  }, [])

  useEffect(() => {
    void listenPorts()
    // interval.current = setInterval(listenPorts, 2000)
    // return () => clearInterval(interval.current)
  }, [listenPorts])
}
