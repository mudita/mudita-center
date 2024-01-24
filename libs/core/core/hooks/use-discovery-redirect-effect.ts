/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { isDeviceListEmpty } from "Core/device-manager/selectors/is-device-list-empty.selector"
import { isActiveDeviceSet } from "Core/device-manager/selectors/is-active-device-set.selector"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

export const useDiscoveryRedirectEffect = () => {
  const history = useHistory()
  const deviceListEmpty = useSelector(isDeviceListEmpty)
  const activeDeviceSet = useSelector(isActiveDeviceSet)
  const discoveryDeviceInProgress = useSelector(isDiscoveryDeviceInProgress)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const appInitializationStatus = useSelector(getAppInitializationStatus)

  useEffect(() => {
    if (appInitializationStatus !== AppInitializationStatus.Initialized) {
      return
    }

    if (deviceListEmpty) {
      return
    }

    if (activeDeviceSet) {
      return
    }

    if (discoveryDeviceInProgress) {
      return
    }

    if (initializationDeviceInProgress) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }, [
    activeDeviceSet,
    appInitializationStatus,
    deviceListEmpty,
    discoveryDeviceInProgress,
    history,
    initializationDeviceInProgress,
  ])
}


