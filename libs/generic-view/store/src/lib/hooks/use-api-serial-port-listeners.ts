/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import { DeviceProtocolMainEvent, DeviceType } from "device-protocol/models"
import { DeviceState } from "device-manager/models"
import { DeviceBaseProperties } from "device-protocol/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { addDevice, removeDevice } from "../views/actions"
import { getAPIConfig } from "../get-api-config"
import { setBackupProcessStatus } from "../backup/actions"
import { closeAllModals } from "../modals/actions"
import { selectBackupProcessStatus } from "../selectors/backup-process-status"
import { abortDataMigration } from "../data-migration/abort-data.migration"
import { selectDataMigrationStatus } from "../selectors/data-migration-status"
import {
  selectDataMigrationSourceDevice,
  selectDataMigrationTargetDevice,
} from "../selectors/data-migration-devices"

export const useAPISerialPortListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const handleDevicesDetached = useHandleDevicesDetached()

  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    const unregisterFailListener = answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      (properties) => {
        const { deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(addDevice({ ...properties, state: DeviceState.Failed }))
      }
    )
    const unregisterConnectListener = answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnected,
      (properties) => {
        const { id, deviceType } = properties
        if (deviceType !== DeviceType.APIDevice) {
          return
        }
        dispatch(addDevice(properties))
        dispatch(getAPIConfig({ deviceId: id }))
      }
    )
    const unregisterDetachedListener = answerMain(
      DeviceProtocolMainEvent.DeviceDetached,
      batchDeviceDetachedEvents
    )

    return () => {
      unregisterDetachedListener()
      unregisterConnectListener()
      unregisterFailListener()
    }
  }, [dispatch, batchDeviceDetachedEvents])
}

const useHandleDevicesDetached = () => {
  const dispatch = useDispatch<Dispatch>()
  const backupProcess = useSelector(selectBackupProcessStatus)
  const migrationStatus = useSelector(selectDataMigrationStatus)
  const sourceDevice = useSelector(selectDataMigrationSourceDevice)
  const targetDevice = useSelector(selectDataMigrationTargetDevice)

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      for (const event of deviceDetachedEvents) {
        if (
          migrationStatus === "IN-PROGRESS" &&
          (sourceDevice?.serialNumber === event.serialNumber ||
            targetDevice?.serialNumber === event.serialNumber)
        ) {
          dispatch(abortDataMigration({ reason: "FAILED" }))
        }
      }

      const apiEvents = deviceDetachedEvents.filter(
        ({ deviceType }) => deviceType === DeviceType.APIDevice
      )

      if (apiEvents.length === 0) {
        return
      }

      for (const event of apiEvents) {
        dispatch(removeDevice(event))
      }
      dispatch(closeAllModals())

      if (backupProcess) {
        dispatch(setBackupProcessStatus("FAILED"))
      }
    },
    [
      dispatch,
      backupProcess,
      migrationStatus,
      sourceDevice?.serialNumber,
      targetDevice?.serialNumber,
    ]
  )
}
