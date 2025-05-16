/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { DeviceState } from "device-manager/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"
import { DeviceError } from "Core/device/modules/mudita-os/constants"
import { deactivateDevice } from "../../../../../device-manager/feature/src/actions/deactivate-device.action"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { selectLastRefreshTimestamp } from "../selectors/select-last-refresh-timestamp"
import { setDeviceState } from "../views/actions"
import { useLockedDeviceHandler } from "./use-locked-device-handler"

function isTimeOutDeviceError(payload: unknown): boolean {
  if (typeof payload === "object" && payload !== null && "type" in payload) {
    return (payload as { type: string }).type === DeviceError.TimeOut
  }
  return false
}

const DEFAULT_OUTBOX_TIMEOUT = 2000
const MAX_OUTBOX_EVENTS = 100

export const useOutbox = () => {
  const [outboxTimeout, setOutboxTimeout] = useState(DEFAULT_OUTBOX_TIMEOUT)
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()
  const activeApiDeviceId = useSelector(selectActiveApiDeviceId)
  const lastRefreshTimestamp = useSelector(selectLastRefreshTimestamp)
  useLockedDeviceHandler()

  useEffect(() => {
    if (!activeApiDeviceId) {
      return
    }

    const outboxTimeoutId = setTimeout(async () => {
      const getOutboxDataResult = await dispatch(
        getOutboxData({ deviceId: activeApiDeviceId })
      )

      const entitiesLength = getOutboxDataResult?.payload.data.entities.length

      if (entitiesLength === MAX_OUTBOX_EVENTS && outboxTimeout !== 0) {
        setOutboxTimeout(0)
      } else if (
        entitiesLength !== MAX_OUTBOX_EVENTS &&
        outboxTimeout !== DEFAULT_OUTBOX_TIMEOUT
      ) {
        setOutboxTimeout(DEFAULT_OUTBOX_TIMEOUT)
      }

      if (isTimeOutDeviceError(getOutboxDataResult?.payload)) {
        history.push(URL_ONBOARDING.troubleshooting)
        await dispatch(deactivateDevice())
        dispatch(
          setDeviceState({ id: activeApiDeviceId, state: DeviceState.Failed })
        )
      }
    }, outboxTimeout)

    return () => {
      clearTimeout(outboxTimeoutId)
    }
  }, [
    activeApiDeviceId,
    lastRefreshTimestamp,
    dispatch,
    history,
    outboxTimeout,
  ])
}

export const OutboxWrapper = () => {
  useOutbox()
  return null
}
