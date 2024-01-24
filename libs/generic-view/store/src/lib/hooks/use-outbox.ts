/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { selectActiveDevice } from "../selectors/active-device"
import { selectLastRefreshTimestamp } from "../selectors/select-last-refresh-timestamp"

export const useOutbox = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDevice = useSelector(selectActiveDevice)
  const lastRefreshTimestamp = useSelector(selectLastRefreshTimestamp)

  useEffect(() => {
    if (activeDevice) {
      const outboxTimeout = setTimeout(() => {
        dispatch(getOutboxData({ deviceId: activeDevice }))
      }, 10000)

      return () => {
        clearTimeout(outboxTimeout)
      }
    }
    return
  }, [activeDevice, lastRefreshTimestamp])
}
