/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { selectActiveDevice } from "../selectors/active-device"
import { selectLastRefreshTimestamp } from "../selectors/select-last-refresh-timestamp"
import { useLockedDeviceHandler } from "./use-locked-device-handler"

export const useOutbox = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDevice = useSelector(selectActiveDevice)
  const lastRefreshTimestamp = useSelector(selectLastRefreshTimestamp)
  useLockedDeviceHandler()

  useEffect(() => {
    if (activeDevice) {
      const outboxTimeout = setTimeout(() => {
        dispatch(getOutboxData({ deviceId: activeDevice }))
      }, 2000)

      return () => {
        clearTimeout(outboxTimeout)
      }
    }
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDevice, lastRefreshTimestamp])
}

export const OutboxWrapper = () => {
  useOutbox()
  return null
}
