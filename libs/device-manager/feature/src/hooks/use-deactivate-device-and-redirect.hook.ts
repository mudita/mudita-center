/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectDialogOpenState } from "shared/app-state"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import {
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { deactivateDevice } from "../actions/deactivate-device.action"

export const useDeactivateDeviceAndRedirect = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const dialogOpen = useSelector(selectDialogOpenState)

  return useCallback(async () => {
    const { payload: devices } = await dispatch(deactivateDevice())

    if (dialogOpen) {
      history.push(URL_ONBOARDING.root)
      return
    }

    if (devices.length > 1) {
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    } else if (devices.length === 1) {
      history.push(URL_DISCOVERY_DEVICE.root)
    } else {
      history.push(URL_ONBOARDING.root)
    }
  }, [history, dispatch, dialogOpen])
}
