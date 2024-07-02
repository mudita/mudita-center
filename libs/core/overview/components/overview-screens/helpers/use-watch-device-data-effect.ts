/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { loadDeviceData } from "Core/device/actions/load-device-data.action"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"

const deviceDataIntervalTime = 10000

export const useWatchDeviceDataEffect = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)

  useEffect(() => {
    if (activeDeviceProcessing) {
      return
    }

    const intervalId = setInterval(async () => {
      dispatch(loadDeviceData())
    }, deviceDataIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch, activeDeviceProcessing])
}
