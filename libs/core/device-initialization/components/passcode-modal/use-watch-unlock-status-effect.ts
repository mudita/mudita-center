/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getUnlockStatus } from "Core/device/actions/get-unlock-status.action"

const unlockStatusIntervalTime = 10000

export const useWatchUnlockStatus = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const intervalId = setInterval(async () => {
      dispatch(getUnlockStatus())
    }, unlockStatusIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch])
}
