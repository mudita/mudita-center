/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { setSelectDeviceDrawerOpen } from "Core/device-select/actions/set-select-device-drawer-open.action"

export const useDeactivateDeviceAndRedirect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const devices = useSelector(getDevicesSelector)

  return useCallback(() => {
    void dispatch(deactivateDevice())
    if (devices.length > 1) {
      dispatch(setSelectDeviceDrawerOpen(false))
      history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
    } else if (devices.length === 1) {
      history.push(URL_DISCOVERY_DEVICE.root)
    } else {
      history.push(URL_MAIN.news)
    }
  }, [devices, history, dispatch])
}
