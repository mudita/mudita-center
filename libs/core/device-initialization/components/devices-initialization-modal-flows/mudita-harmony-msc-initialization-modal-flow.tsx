/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { useHistory } from "react-router-dom"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

export const HarmonyMscInitializationModalFlow: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    history.push(URL_MAIN.recoveryMode)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
