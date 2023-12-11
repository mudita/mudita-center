/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { useEffect } from "react"
import { ipcRenderer } from "electron-better-ipc"
import { ApiSerialPortEvent } from "App/api-main/models/device-communication-event.constant"
import { answerMain } from "../helpers/answer-main"

export const useAPIListeners = () => {
  useEffect(() => {
    const unregisterFailListener = answerMain(
      "api-serial-port-initialization-failed",
      (x) => {
        console.log(x)
      }
    )
    // const unregisterFailListener = ipcRenderer.answerMain(
    //   ApiSerialPortEvent.InitializationFailed,
    //   (x) => {
    //     console.log(x)
    //   }
    // )

    return () => {
      unregisterFailListener()
    }
  }, [])
}
