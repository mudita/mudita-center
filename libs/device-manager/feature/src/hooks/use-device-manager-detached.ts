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
import {
  abortDataMigration,
  clearEntities,
  closeAllModals,
  DataMigrationStatus,
  removeDevice,
  selectBackupProcessStatus,
  selectDataMigrationSourceDevice,
  selectDataMigrationStatus,
  selectDataMigrationTargetDevice,
  setBackupProcessStatus,
} from "generic-view/store"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { groupEventsByDeviceType } from "../helpers"

// TODO: handle the following workarounds with imports
import { abortMscFlashing } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/abort-msc-flashing"
import { setFlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/set-flashing-process-state.action"
import { FlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/constants/flashing-process-state.constant"
import { selectIsFlashingInActivePhases } from "../../../../msc-flash/msc-flash-harmony/src/lib/selectors/select-is-flashing-in-active-phases"
import { setMscFlashingInitialState } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/actions"
import { selectFlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/selectors/select-flashing-process-state"

export const useDeviceManagerDetached = () => {
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
  const flashingProcessState = useSelector(selectFlashingProcessState)
  const flashingInActivePhases = useSelector(selectIsFlashingInActivePhases)
  const flashingInWaitingForBackButtonState =
    flashingProcessState === FlashingProcessState.WaitingForBackButton
  const flashingInRestartingPhase =
    flashingProcessState === FlashingProcessState.Restarting


  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const groupedEvents = groupEventsByDeviceType(deviceDetachedEvents)
      const apiEvents = groupedEvents[DeviceType.APIDevice]
      const coreEvents = [
        ...groupedEvents[DeviceType.MuditaPure],
        ...groupedEvents[DeviceType.MuditaHarmony],
      ]
      const mscEvents = groupedEvents[DeviceType.MuditaHarmonyMsc]

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

      for (const event of coreEvents) {
        dispatch(removeDevice(event))
      }

      // TODO: add mds handler
      for (const event of mscEvents) {
        dispatch(removeDevice(event))
      }

      for (const event of apiEvents) {
        dispatch(removeDevice(event))
        dispatch(clearEntities({ deviceId: event.id }))
      }

      if (apiEvents.length !== 0) {
        dispatch(closeAllModals())

        if (backupProcess) {
          dispatch(setBackupProcessStatus("FAILED"))
        }
      }

      if (mscEvents.length !== 0) {
        if (flashingInWaitingForBackButtonState) {
          dispatch(setMscFlashingInitialState())
          return
        }

        if (flashingInRestartingPhase) {
          dispatch(setFlashingProcessState(FlashingProcessState.Completed))
        }

        const reason = flashingInActivePhases
          ? FlashingProcessState.Failed
          : undefined
        dispatch(abortMscFlashing({ reason }))
      }
    },
    [
      dispatch,
      flashingInActivePhases,
      flashingInWaitingForBackButtonState,
      flashingInRestartingPhase,
      backupProcess,
      migrationStatus,
      sourceDevice?.serialNumber,
      targetDevice?.serialNumber,
    ]
  )
}
