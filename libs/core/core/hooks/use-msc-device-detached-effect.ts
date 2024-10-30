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
  abortMscFlashing,
  FlashingProcessState,
  selectFlashingProcessState,
  selectIsFlashingInActivePhases,
  setFlashingProcessState,
  setMscFlashingInitialState,
} from "msc-flash-harmony"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useMscDeviceDetachedEffect = () => {
  const handleDevicesDetached = useHandleDevicesDetached()

  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    return answerMain(
      DeviceProtocolMainEvent.DeviceDetached,
      batchDeviceDetachedEvents
    )
  }, [batchDeviceDetachedEvents])
}

const useHandleDevicesDetached = () => {
  const dispatch = useDispatch<Dispatch>()
  const flashingProcessState = useSelector(selectFlashingProcessState)
  const flashingInActivePhases = useSelector(selectIsFlashingInActivePhases)
  const flashingInWaitingForBackButtonState =
    flashingProcessState === FlashingProcessState.WaitingForBackButton
  const flashingInRestartingPhase =
    flashingProcessState === FlashingProcessState.Restarting

  return useCallback(
    (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const mscEvents = deviceDetachedEvents.filter(
        ({ deviceType }) => deviceType === DeviceType.MuditaHarmonyMsc
      )

      if (mscEvents.length === 0) {
        return
      }

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
    },
    [
      dispatch,
      flashingInActivePhases,
      flashingInWaitingForBackButtonState,
      flashingInRestartingPhase,
    ]
  )
}
