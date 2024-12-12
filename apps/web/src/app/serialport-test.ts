/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"
const { list } = window.api.SerialPort

export const useSerialPortListener = () => {
  const interval = useRef<NodeJS.Timeout>()

  const listenPorts = useCallback(async () => {
    const ports = await list()
    console.log(ports)
  }, [])

  useEffect(() => {
    interval.current = setInterval(listenPorts, 2000)
    return () => clearInterval(interval.current)
  })
}
