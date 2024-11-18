/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { selectLastRefreshTimestamp } from "../selectors/select-last-refresh-timestamp"
import { useLockedDeviceHandler } from "./use-locked-device-handler"

export const useOutbox = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeApiDeviceId = useSelector(selectActiveApiDeviceId)
  const lastRefreshTimestamp = useSelector(selectLastRefreshTimestamp)
  useLockedDeviceHandler()

  useEffect(() => {
    if (!activeApiDeviceId) {
      return
    }

    const outboxTimeout = setTimeout(() => {
      dispatch(getOutboxData({ deviceId: activeApiDeviceId }))
    }, 2000)

    return () => {
      clearTimeout(outboxTimeout)
    }
  }, [activeApiDeviceId, lastRefreshTimestamp, dispatch])
}

export const OutboxWrapper = () => {
  useOutbox()
  return null
}
