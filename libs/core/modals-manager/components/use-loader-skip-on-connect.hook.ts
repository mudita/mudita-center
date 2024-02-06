/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { checkIsAnyOtherModalPresent } from "Core/utils/check-is-any-other-modal-present"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { useNoNewDevicesDetectedHook } from "Core/discovery-device/hooks/use-no-new-devices-detected.hook"

export const CONNECTING_LOADER_MODAL_ID = "connecting-loader-modal"

export const useLoaderSkipOnConnect = () => {
  const history = useHistory()

  const noNewDevicesDetectedState = useNoNewDevicesDetectedHook()
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)

  return useCallback(() => {
   return history.location.pathname === URL_DISCOVERY_DEVICE.root ||
     initializationDeviceInProgress ||
     initializationAppInProgress ||
     activeDeviceProcessing ||
     checkIsAnyOtherModalPresent(CONNECTING_LOADER_MODAL_ID) ||
     !noNewDevicesDetectedState
  }, [
    history.location.pathname,
    initializationDeviceInProgress,
    initializationAppInProgress,
    activeDeviceProcessing,
    noNewDevicesDetectedState])
}
