/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useEffect } from "react"

export interface NetworkStatusCheckerProps {
  updateOnlineStatus: () => void
}

const NetworkStatusChecker: FunctionComponent<NetworkStatusCheckerProps> = ({
  updateOnlineStatus,
}) => {
  useEffect(() => {
    updateOnlineStatus()
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])
  return null
}

export default NetworkStatusChecker
