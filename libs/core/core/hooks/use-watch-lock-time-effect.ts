/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getActiveDeviceTypeSelector } from "Core/device-manager/selectors/get-active-device-type.selector"
import { DeviceType, setLockTime } from "Core/device"
import { deviceUnlockedStatusSelector } from "Core/device/selectors/device-unlocked-status.selector"
import { deviceLockTimeRequest } from "Core/device/requests"
import { PhoneLockTime } from "Core/device/dto"

const deviceLockIntervalTime = 15000

export const useWatchLockTimeEffect = () => {
  const previousPhoneLockTime = useRef<undefined | PhoneLockTime>(undefined)
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceUnlockedStatus = useSelector(deviceUnlockedStatusSelector)

  useEffect(() => {
    if (activeDeviceType !== DeviceType.MuditaPure) {
      return
    }

    if (deviceUnlockedStatus) {
      return
    }

    const intervalId = setInterval(async () => {
      const result = await deviceLockTimeRequest()
      const phoneLockTime = result.ok ? result.data : undefined

      if (
        JSON.stringify(previousPhoneLockTime.current) !==
        JSON.stringify(phoneLockTime)
      ) {
        dispatch(setLockTime(phoneLockTime))
      }

      previousPhoneLockTime.current = phoneLockTime
    }, deviceLockIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch, activeDeviceType, deviceUnlockedStatus])
}
