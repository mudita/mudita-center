/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isAnyOtherModalPresentSelector } from "Core/modals-manager/selectors/is-any-other-modal-present.selector"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"
import { registerDeviceConnectFailedListener } from "Core/device-manager/listeners/device-connect-failed.listener"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { useNoNewDevicesDetectedHook } from "Core/discovery-device/hooks/use-no-new-devices-detected.hook"

const CONNECTING_LOADER_MODAL_ID = "connecting-loader-modal"

const messages = defineMessages({
  subtitle: {
    id: "component.connectingLoaderModal.subtitle",
  },
})

const ConnectingLoaderModalContainer: FunctionComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const noNewDevicesDetectedState = useNoNewDevicesDetectedHook()

  const history = useHistory()
  const isAnyOtherModalPresent = useSelector((state: ReduxRootState) =>
    isAnyOtherModalPresentSelector(state, CONNECTING_LOADER_MODAL_ID)
  )

  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)

  useEffect(() => {
    const handler = async () => {
      if (
        history.location.pathname === URL_DISCOVERY_DEVICE.root ||
        initializationDeviceInProgress ||
        initializationAppInProgress ||
        activeDeviceProcessing ||
        isAnyOtherModalPresent ||
        !noNewDevicesDetectedState
      ) {
        setOpenModal(false)
      } else {
        setOpenModal(true)
      }
    }

    const unregisterDeviceConnectedListener =
      registerDeviceConnectedListener(handler)
    const unregisterDeviceConnectFailedListener =
      registerDeviceConnectFailedListener(handler)

    return () => {
      unregisterDeviceConnectedListener()
      unregisterDeviceConnectFailedListener()
    }
  }, [
    history.location.pathname,
    initializationDeviceInProgress,
    initializationAppInProgress,
    activeDeviceProcessing,
    isAnyOtherModalPresent,
    noNewDevicesDetectedState,
  ])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (openModal) {
      timeoutId = setTimeout(() => {
        setOpenModal(false)
      }, 3000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [openModal])

  return (
    <LoaderModal
      data={{ "modal-id": CONNECTING_LOADER_MODAL_ID }}
      subtitle={intl.formatMessage(messages.subtitle)}
      open={openModal}
    />
  )
}

export default ConnectingLoaderModalContainer
