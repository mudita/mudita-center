/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { Device } from "core-device/models"
import { DeviceProtocolMainEvent, DeviceType } from "device-protocol/models"
import { useDispatch, useSelector } from "react-redux"
import { answerMain } from "shared/utils"
import { detachDevice } from "../views/actions"
import { getAPIConfig } from "../get-api-config"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setBackupProcessStatus } from "../backup/actions"
import { closeAllModals } from "../modals/actions"
import { selectBackupProcessStatus } from "../selectors"
import { clearDataMigrationDevice } from "../data-migration/clear-data-migration.action"

export const useAPISerialPortListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const backupProcess = useSelector(selectBackupProcessStatus)

  useEffect(() => {
    const unregisterFailListener = answerMain<Device>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      (properties) => {
        const { deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        // todo: connection error handling
        console.log(properties)
      }
    )
    const unregisterConnectListener = answerMain<Device>(
      DeviceProtocolMainEvent.DeviceConnected,
      (properties) => {
        const { id, deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    const unregisterDetachedListener = answerMain<Device>(
      DeviceProtocolMainEvent.DeviceDetached,
      async (properties) => {
        const { id, deviceType } = properties
        dispatch(clearDataMigrationDevice(id))

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
