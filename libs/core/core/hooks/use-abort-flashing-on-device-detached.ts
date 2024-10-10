/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain } from "shared/utils"
import {
  DeviceBaseProperties,
  DeviceProtocolMainEvent,
} from "device-protocol/models"
import { abortMscFlashing } from "msc-flash-harmony"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useAbortFlashingOnDeviceDetached = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceDetached,
      () => {
        dispatch(abortMscFlashing())
      }
    )
  }, [dispatch])
}
