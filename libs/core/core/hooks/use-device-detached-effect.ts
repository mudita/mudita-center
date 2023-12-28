/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { registerDeviceDetachedListener } from "Core/device-manager/listeners"
import { handleDeviceDetached } from "Core/device-manager/actions/handle-device-detached.action"

export const useDeviceDetachedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const onDeviceConnectedHandler = async (properties: DeviceBaseProperties) => {
      await dispatch(handleDeviceDetached({ properties, history }))
    }

    const deviceDetached = registerDeviceDetachedListener(
      onDeviceConnectedHandler
    )
    return () => {
      deviceDetached()
    }
  }, [dispatch, history])
}
