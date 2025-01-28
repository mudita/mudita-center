/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { answerMain } from "shared/utils"
import {
  getDevicesSelector,
  setSelectDeviceDrawerOpen,
} from "device-manager/feature"
import { DeviceProtocolMainEvent } from "device-protocol/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { getDiscoveryStatus } from "Core/discovery-device/selectors/get-discovery-status.selector"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import {
  CONNECTING_LOADER_MODAL_ID,
  useLoaderSkipOnConnect,
} from "Core/modals-manager/components/use-loader-skip-on-connect.hook"
import { DeviceState } from "device-manager/models"

const messages = defineMessages({
  subtitle: {
    id: "component.connectingLoaderModal.subtitle",
  },
})

const ConnectingLoaderModal: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const [loaderModalOpened, setLoaderModalOpened] = useState<boolean>(false)
  const devices = useSelector(getDevicesSelector)
  const history = useHistory()
  const discoveryStatus = useSelector(getDiscoveryStatus)
  const shouldLoaderSkipOnConnect = useLoaderSkipOnConnect()

  const devicesInProgress = devices.filter((device) => {
    return [DeviceState.Connected, DeviceState.Initialized].includes(
      device.state
    )
  })

  useEffect(() => {
    const handler = () => {
      setLoaderModalOpened(!shouldLoaderSkipOnConnect())
    }

    const unregisterDeviceConnectedListener = answerMain(
      DeviceProtocolMainEvent.DeviceConnected,
      handler
    )
    const unregisterDeviceConnectFailedListener = answerMain(
      DeviceProtocolMainEvent.DeviceConnectFailed,
      handler
    )

    return () => {
      unregisterDeviceConnectedListener()
      unregisterDeviceConnectFailedListener()
    }
  }, [shouldLoaderSkipOnConnect])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (loaderModalOpened) {
      timeoutId = setTimeout(() => {
        if (devicesInProgress.length > 0) {
          return
        }
        setLoaderModalOpened(false)
        const pathname = history.location.pathname
        if (
          ![
            URL_DISCOVERY_DEVICE.root,
            URL_DISCOVERY_DEVICE.availableDeviceListModal,
            URL_MAIN.dataMigration,
            URL_MAIN.dataMigrationKompakt,
          ].includes(pathname) &&
          discoveryStatus !== DiscoveryStatus.Aborted
        ) {
          dispatch(setSelectDeviceDrawerOpen(true))
        }
      }, 3000)
    }

    const unregister = history.listen((location) => {
      if (location.pathname.includes(URL_DISCOVERY_DEVICE.root)) {
        clearTimeout(timeoutId)
        setLoaderModalOpened(false)
      }
    })

    return () => {
      clearTimeout(timeoutId)
      unregister()
    }
  }, [
    devicesInProgress.length,
    discoveryStatus,
    dispatch,
    history,
    loaderModalOpened,
  ])

  return (
    <LoaderModal
      data={{ "modal-id": CONNECTING_LOADER_MODAL_ID }}
      subtitle={intl.formatMessage(messages.subtitle)}
      open={loaderModalOpened}
      layer={ModalLayers.ConnectingLoader}
    />
  )
}

export default ConnectingLoaderModal
