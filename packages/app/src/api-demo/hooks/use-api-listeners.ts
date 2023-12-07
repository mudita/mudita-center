/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { useEffect } from "react"
import { ipcRenderer } from "electron-better-ipc"
import { ApiSerialPortEvent } from "App/api-main/models/device-communication-event.constant"

export const useAPIListeners = () => {
  useEffect(() => {
    const initFailListener = ipcRenderer.answerMain(
      ApiSerialPortEvent.InitializationFailed,
      (x) => {
        console.log(x)
      }
    )

    return () => {
      initFailListener()
    }
  })
}
