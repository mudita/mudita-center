/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain } from "shared/utils"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
} from "device-protocol/models"
import {
  abortMscFlashing,
  FlashingProcessState,
  selectIsFlashingInActivePhases,
} from "msc-flash-harmony"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useAbortFlashingOnDeviceDetached = () => {
  const dispatch = useDispatch<Dispatch>()
  const flashingInActivePhases = useSelector(selectIsFlashingInActivePhases)

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceDetached,
      () => {
        const reason = flashingInActivePhases
          ? FlashingProcessState.Failed
          : undefined
        dispatch(abortMscFlashing({ reason }))
      }
    )
  }, [dispatch, flashingInActivePhases])
}
