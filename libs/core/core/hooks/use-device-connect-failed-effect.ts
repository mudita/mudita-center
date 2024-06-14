/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { answerMain } from "shared/utils"
import { DeviceProtocolMainEvent } from "device-protocol/models"
import { DeviceBaseProperties } from "device-protocol/models"
import { activeDeviceIdSelector } from "device-manager/feature"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"

export const useDeviceConnectFailedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const discoveryDeviceInProgress = useSelector(isDiscoveryDeviceInProgress)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)

  const shouldSkipProcessing = useCallback(() => {
    return (
      discoveryDeviceInProgress ||
      initializationDeviceInProgress ||
      initializationAppInProgress ||
      activeDeviceProcessing
    )
  }, [
    discoveryDeviceInProgress,
    initializationDeviceInProgress,
    initializationAppInProgress,
    activeDeviceProcessing,
  ])

  const handleDeviceConnectFailed = useCallback(async () => {
    if (activeDeviceId) {
      return
    }

    if (shouldSkipProcessing()) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }, [activeDeviceId, shouldSkipProcessing, history])

  useEffect(() => {
    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      handleDeviceConnectFailed
    )
  }, [handleDeviceConnectFailed])
}
