/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "Core/device-manager/reducers/device-manager.interface"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain, DeviceManagerMainEvent } from "shared/utils"
import { detachDevice } from "../views/actions"
import { getAPIConfig } from "../get-api-config"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceType } from "Core/device"
import { setBackupProcessStatus } from "../backup/actions"
import { closeAllModals } from "../modals/actions"
import { selectBackupProcessStatus } from "../selectors"

export const useAPISerialPortListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const backupProcess = useSelector(selectBackupProcessStatus)

  useEffect(() => {
    const unregisterFailListener = answerMain(
      DeviceManagerMainEvent.DeviceConnectFailed,
      (properties) => {
        const { deviceType } = properties as Device
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        // todo: connection error handling
        console.log(properties)
      }
    )
    const unregisterConnectListener = answerMain(
      DeviceManagerMainEvent.DeviceConnected,
      (properties) => {
        const { id, deviceType } = properties as Device
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    const unregisterDetachedListener = answerMain(
      DeviceManagerMainEvent.DeviceDetached,
      async (properties) => {
        const { id, deviceType } = properties as Device
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(detachDevice({ deviceId: id }))
        dispatch(closeAllModals())
        if (backupProcess) {
          dispatch(setBackupProcessStatus("FAILED"))
        }
      }
    )
    return () => {
      unregisterDetachedListener()
      unregisterConnectListener()
      unregisterFailListener()
    }
  }, [backupProcess, dispatch])
}
