/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setLockTime } from "Core/device"
import { deviceUnlockedStatusSelector } from "Core/device/selectors/device-unlocked-status.selector"
import { deviceLockTimeRequest } from "Core/device/requests"
import { PhoneLockTime } from "Core/device/dto"

const arePhoneLockTimesEqual = (
  objA: undefined | PhoneLockTime,
  objB: undefined | PhoneLockTime
): boolean => {
  return (
    objA?.phoneLockTime === objB?.phoneLockTime &&
    objA?.timeLeftToNextAttempt === objB?.timeLeftToNextAttempt
  )
}

const deviceLockIntervalTime = 15000

export const useWatchLockTimeEffect = () => {
  const previousPhoneLockTimeRef = useRef<undefined | PhoneLockTime>(undefined)
  const dispatch = useDispatch<Dispatch>()
  const deviceUnlockedStatus = useSelector(deviceUnlockedStatusSelector)

  useEffect(() => {
    if (deviceUnlockedStatus !== false) {
      return
    }

    const intervalId = setInterval(async () => {
      const result = await deviceLockTimeRequest()
      const phoneLockTime = result.ok ? result.data : undefined
      const previousPhoneLockTime = previousPhoneLockTimeRef.current

      if (arePhoneLockTimesEqual(previousPhoneLockTime, phoneLockTime)) {
        dispatch(setLockTime(phoneLockTime))
      }

      previousPhoneLockTimeRef.current = phoneLockTime
    }, deviceLockIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch, deviceUnlockedStatus])
}
