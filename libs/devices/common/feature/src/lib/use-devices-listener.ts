/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setDevices } from "./store/devices.actions"

export const useDevicesListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AppSerialPort.onDevicesChanged((changed) => {
      dispatch(setDevices(changed.all))
    })
  }, [dispatch])
}
