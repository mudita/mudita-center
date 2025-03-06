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

export const useDevicesListener = () => {
  const store = useStore<AppState>()
  const dispatch = useDispatch()

  useEffect(() => {
    AppSerialPort.onDevicesChanged((changed) => {
      const currentDevice = selectCurrentDevice(store.getState())
      const connectedDevices = changed.all.map((device) => ({
        ...device,
        active: currentDevice?.path === device.path || changed.all.length === 1,
      }))
      dispatch(setConnectedDevices(connectedDevices))
    })
  }, [dispatch, store])
}
