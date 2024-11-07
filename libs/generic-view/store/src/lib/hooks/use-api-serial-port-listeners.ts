/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
  DeviceType,
} from "device-protocol/models"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { removeDevice } from "../views/actions"
import { setBackupProcessStatus } from "../backup/actions"
import { closeAllModals } from "../modals/actions"
import { selectBackupProcessStatus } from "../selectors/backup-process-status"
import { abortDataMigration } from "../data-migration/abort-data.migration"
import { selectDataMigrationStatus } from "../selectors/data-migration-status"
import {
  selectDataMigrationSourceDevice,
  selectDataMigrationTargetDevice,
} from "../selectors/data-migration-devices"
import { clearEntities } from "../entities/actions"
import { DataMigrationStatus } from "../data-migration/reducer"

export const useAPISerialPortListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const handleDevicesDetached = useHandleDevicesDetached()

  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    const unregisterDetachedListener = answerMain(
      DeviceProtocolMainEvent.DeviceDetached,
      batchDeviceDetachedEvents
    )

    return () => {
      unregisterDetachedListener()
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
          migrationStatus === DataMigrationStatus.DataTransferring &&
          (sourceDevice?.serialNumber === event.serialNumber ||
            targetDevice?.serialNumber === event.serialNumber)
        ) {
          dispatch(abortDataMigration({ reason: DataMigrationStatus.Failed }))
        }
        if (
          event.deviceType === "MuditaPure" &&
          event.serialNumber === sourceDevice?.serialNumber &&
          [
            DataMigrationStatus.PureDatabaseCreating,
            DataMigrationStatus.PureDatabaseIndexing,
          ].includes(migrationStatus)
        ) {
          return
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
        dispatch(clearEntities({ deviceId: event.id }))
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
