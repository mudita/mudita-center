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
import { DeviceState } from "device-manager/models"
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
import { clearEntities } from "../entities/actions"
import { DataMigrationStatus } from "../data-migration/reducer"
import { BackupProcessStatus } from "../backup/backup.types"

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
        dispatch(getAPIConfig({ deviceId: id, retry: true }))
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

      if (
        backupProcess &&
        [
          BackupProcessStatus.PRE_BACKUP,
          BackupProcessStatus.SAVE_FILE,
          BackupProcessStatus.FILES_TRANSFER,
        ].includes(backupProcess)
      ) {
        dispatch(setBackupProcessStatus(BackupProcessStatus.FAILED))
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
