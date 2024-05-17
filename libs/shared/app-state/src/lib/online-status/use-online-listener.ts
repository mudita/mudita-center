/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { updateOnlineStatus } from "./base.action"

export const useOnlineListener = () => {
  useEffect(() => {
    updateOnlineStatus(window.navigator.onLine)
    const handleOnlineStatus = () => updateOnlineStatus(window.navigator.onLine)

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])
}
