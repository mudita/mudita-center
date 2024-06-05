/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { DeviceId } from "Core/device/constants/device-id"
import { setSourceDevice } from "generic-view/store"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { handleDeviceActivated } from "Core/device-manager/actions/handle-device-activated.action"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"
import { useDispatch, useSelector } from "react-redux"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useHistory } from "react-router-dom"

export const useDataMigrationDeviceSelector = () => {
  const activeDevice = useSelector(getActiveDevice)
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  return useCallback(
    async (
      serialNumber: DeviceId,
      pathToRedirect = URL_DEVICE_INITIALIZATION.root
    ) => {
      if (!activeDevice || !activeDevice.serialNumber) return
      await dispatch(setSourceDevice(activeDevice.serialNumber))
      await dispatch(deactivateDevice())
      await dispatch(handleDeviceActivated(serialNumber))
      history.push(pathToRedirect)
    },
    [activeDevice, dispatch, history]
  )
}
