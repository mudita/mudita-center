/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import { selectDialogOpenState } from "shared/app-state"
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
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { cancelOsDownload } from "Core/update/requests"
import {
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { groupEventsByDeviceType } from "../helpers"
import { getDevicesSelector } from "../selectors"
import { deactivateDevice } from "../actions"

// TODO: handle the following workarounds with imports
import { abortMscFlashing } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/abort-msc-flashing"
import { setFlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/set-flashing-process-state.action"
import { FlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/constants/flashing-process-state.constant"
import { selectIsFlashingInActivePhases } from "../../../../msc-flash/msc-flash-harmony/src/lib/selectors/select-is-flashing-in-active-phases"
import { setMscFlashingInitialState } from "../../../../msc-flash/msc-flash-harmony/src/lib/actions/actions"
import { selectFlashingProcessState } from "../../../../msc-flash/msc-flash-harmony/src/lib/selectors/select-flashing-process-state"

import { useDeactivateDeviceAndRedirect } from "./use-deactivate-device-and-redirect.hook"
import { closeContactSupportFlow } from "Core/contact-support"

// TODO: handle the following workarounds with parse svg token error
// import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import {
  modalEventEmitter,
  ModelEvent,
} from "Core/__deprecated__/renderer/components/core/modal/modal-service-emitter"
import { shouldSkipProcessingForDetachedPure } from "Libs/device-manager/feature/src/helpers/should-skip-processing-for-detached-pure"
import { isDataMigrationAbortDueToDetach } from "Libs/device-manager/feature/src/helpers/is-data-migration-abort-due-to-detach"

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

  const processActiveDevicesDetachment = useProcessActiveDevicesDetachment()
  const processSingleDeviceRemaining = useProcessSingleDeviceRemaining()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const groupedEvents = groupEventsByDeviceType(deviceDetachedEvents)
      const apiEvents = groupedEvents[DeviceType.APIDevice]
      const coreEvents = [
        ...groupedEvents[DeviceType.MuditaPure],
        ...groupedEvents[DeviceType.MuditaHarmony],
      ]
      const mscEvents = groupedEvents[DeviceType.MuditaHarmonyMsc]

      if (
        shouldSkipProcessingForDetachedPure(
          deviceDetachedEvents,
          migrationStatus,
          sourceDevice
        )
      ) {
        return
      }

      if (
        isDataMigrationAbortDueToDetach(
          deviceDetachedEvents,
          migrationStatus,
          sourceDevice,
          targetDevice
        )
      ) {
        dispatch(abortDataMigration({ reason: DataMigrationStatus.Failed }))
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

      await processActiveDevicesDetachment(deviceDetachedEvents)
      processSingleDeviceRemaining(deviceDetachedEvents)
    },
    [
      dispatch,
      flashingInActivePhases,
      flashingInWaitingForBackButtonState,
      flashingInRestartingPhase,
      backupProcess,
      migrationStatus,
      sourceDevice,
      targetDevice,
      processActiveDevicesDetachment,
      processSingleDeviceRemaining,
    ]
  )
}

const useProcessActiveDevicesDetachment = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const downloadProcessing = useSelector(
    ({ update }: ReduxRootState) => update.downloadState
  )

  const deactivateDeviceAndRedirect = useDeactivateDeviceAndRedirect()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const activeDeviceDetached = deviceDetachedEvents.some(
        ({ id }) => activeDeviceId === id
      )

      if (activeDeviceDetached) {
        dispatch(closeContactSupportFlow())
        // await modalService.closeModal(true)
        modalEventEmitter.emit(ModelEvent.Close, true)

        if (activeDeviceProcessing) {
          return
        }

        if (downloadProcessing) {
          await dispatch(deactivateDevice())
          cancelOsDownload()
          history.push(URL_ONBOARDING.welcome)
          return
        }

        await deactivateDeviceAndRedirect()
      }
    },
    [
      history,
      dispatch,
      activeDeviceId,
      activeDeviceProcessing,
      downloadProcessing,
      deactivateDeviceAndRedirect,
    ]
  )
}

const useProcessSingleDeviceRemaining = () => {
  const history = useHistory()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const devices = useSelector(getDevicesSelector)
  const dialogOpen = useSelector(selectDialogOpenState)

  return useCallback(
    (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const devicesLeftAfterDetach =
        devices.length - deviceDetachedEvents.length

      if (
        !activeDeviceProcessing &&
        activeDeviceId === undefined &&
        devicesLeftAfterDetach === 1 &&
        !dialogOpen
      ) {
        history.push(URL_DISCOVERY_DEVICE.root)
        return
      }
    },
    [
      dialogOpen,
      history,
      activeDeviceId,
      activeDeviceProcessing,
      devices.length,
    ]
  )
}
