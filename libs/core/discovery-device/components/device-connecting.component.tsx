/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { delay } from "shared/utils"
import { connectDevice, getActiveDevice } from "device-manager/feature"
import { configureDevice } from "core-device/feature"
import { DeviceType } from "device-protocol/models"
import { getAPIConfig } from "generic-view/store"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"

const DeviceConnecting: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()
  const activeDevice = useSelector(getActiveDevice)

  useEffect(() => {
    const handleConnectDevice = async () => {
      if (activeDevice?.id === undefined) {
        history.push(URL_DISCOVERY_DEVICE.root)
        return
      }

      await delay(500)
      const { payload: ok } = await dispatch(connectDevice(activeDevice.id))

      if (!ok) {
        history.push(URL_ONBOARDING.troubleshooting)
        return
      }

      if (activeDevice.deviceType !== DeviceType.APIDevice) {
        await dispatch(configureDevice(activeDevice.id))
      } else {
        await dispatch(getAPIConfig({ deviceId: activeDevice.id }))
      }

      history.push(URL_DEVICE_INITIALIZATION.root)
    }

    void handleConnectDevice()
  }, [history, dispatch, activeDevice])

  return <ConnectingContent />
}

export default DeviceConnecting
