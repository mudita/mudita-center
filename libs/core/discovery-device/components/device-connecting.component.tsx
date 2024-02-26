/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { delay } from "shared/utils"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { connectDevice } from "Core/device-manager/actions/connect-device.action"
import { configureDevice } from "Core/device-manager/actions/configure-device.action"

const DeviceConnecting: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const activeDeviceId = useSelector(activeDeviceIdSelector)

  useEffect(() => {
    const handleConnectDevice = async () => {
      if (activeDeviceId !== undefined) {
        const { payload: ok } = await dispatch(connectDevice(activeDeviceId))

        if (ok) {
          await dispatch(configureDevice(activeDeviceId))
          history.push(URL_DEVICE_INITIALIZATION.root)
        } else {
          await delay(500)
          history.push(URL_ONBOARDING.troubleshooting)
        }
      } else {
        history.push(URL_DISCOVERY_DEVICE.root)
      }
    }

    void handleConnectDevice()
  }, [history, dispatch, activeDeviceId])

  return <ConnectingContent />
}

export default DeviceConnecting
