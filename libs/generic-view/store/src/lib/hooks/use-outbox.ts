/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { DeviceState } from "device-manager/models"
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

export const useOutbox = () => {
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()
  const activeApiDeviceId = useSelector(selectActiveApiDeviceId)
  const lastRefreshTimestamp = useSelector(selectLastRefreshTimestamp)
  useLockedDeviceHandler()

  useEffect(() => {
    if (!activeApiDeviceId) {
      return
    }

    const outboxTimeout = setTimeout(async () => {
      const getOutboxDataResult = await dispatch(
        getOutboxData({ deviceId: activeApiDeviceId })
      )

      if (isTimeOutDeviceError(getOutboxDataResult?.payload)) {
        history.push(URL_ONBOARDING.troubleshooting)
        await dispatch(deactivateDevice())
        dispatch(
          setDeviceState({ id: activeApiDeviceId, state: DeviceState.Failed })
        )
      }
    }, 2000)

    return () => {
      clearTimeout(outboxTimeout)
    }
  }, [activeApiDeviceId, lastRefreshTimestamp, dispatch, history])
}

export const OutboxWrapper = () => {
  useOutbox()
  return null
}
