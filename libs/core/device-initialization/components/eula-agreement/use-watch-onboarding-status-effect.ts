/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getOnboardingStatus } from "Core/device/actions/get-onboarding-status.action"

const onboardingStatusIntervalTime = 10000

export const useWatchOnboardingStatus = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const intervalId = setInterval(async () => {
      dispatch(getOnboardingStatus())
    }, onboardingStatusIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch])
}
