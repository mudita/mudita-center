/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { selectDialogOpenState } from "shared/app-state"

export const useDeactivateDeviceAndRedirect = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const dialogOpen = useSelector(selectDialogOpenState)

  return useCallback(async () => {
    const { payload: devices } = await dispatch(deactivateDevice())

    if (dialogOpen) {
      history.push(URL_MAIN.news)
      return
    }

    if (devices.length > 1) {
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    } else if (devices.length === 1) {
      history.push(URL_DISCOVERY_DEVICE.root)
    } else {
      history.push(URL_MAIN.news)
    }
  }, [history, dispatch, dialogOpen])
}
