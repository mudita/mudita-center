/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default NetworkStatusChecker
