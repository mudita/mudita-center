/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { updateOnlineStatus } from "./base.action"
import { updateOnlineStatusRequest } from "./online-status.requests"
import { useDispatch } from "react-redux"

export const useOnlineListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateOnlineStatus(window.navigator.onLine))
    void updateOnlineStatusRequest(window.navigator.onLine)
    const handleOnlineStatus = () => {
      dispatch(updateOnlineStatus(window.navigator.onLine))
      void updateOnlineStatusRequest(window.navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [dispatch])
}
