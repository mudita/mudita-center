/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { useEffect } from "react"
import { answerMain } from "App/api-demo/helpers/answer-main"

export const useAPISerialPortListeners = () => {
  useEffect(() => {
    const unregisterFailListener = answerMain(
      "api-serial-port-initialization-failed",
      (x) => {
        console.log(x)
      }
    )

    return () => {
      unregisterFailListener()
    }
  }, [])
}
