/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { registerDeviceDetachedListener } from "Core/device-manager/listeners"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { removeDevice } from "Core/device-manager/actions/base.action"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { cancelOsDownload } from "Core/update/requests"
import {
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { useDeactivateDeviceAndRedirect } from "Core/overview/components/overview-screens/pure-overview/use-deactivate-device-and-redirect.hook"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { useDebouncedEventsHandler } from "Core/core/hooks/use-debounced-events-handler"

export const useDeviceDetachedEffect = () => {
  const handleDevicesDetached = useHandleDevicesDetached()

  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    return registerDeviceDetachedListener(batchDeviceDetachedEvents)
  }, [batchDeviceDetachedEvents])
}

const useHandleDevicesDetached = () => {
  const dispatch = useDispatch<Dispatch>()
  const processActiveDevicesDetachment = useProcessActiveDevicesDetachment()
  const processSingleDeviceRemaining = useProcessSingleDeviceRemaining()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      for (const event of deviceDetachedEvents) {
        dispatch(removeDevice(event))
      }

      await processActiveDevicesDetachment(deviceDetachedEvents)
      processSingleDeviceRemaining(deviceDetachedEvents)
    },
    [dispatch, processActiveDevicesDetachment, processSingleDeviceRemaining]
  )
}

const useProcessActiveDevicesDetachment = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const downloadProcessing = useSelector(
    ({ update }: ReduxRootState) => update.downloadState
  )

  const deactivateDeviceAndRedirect = useDeactivateDeviceAndRedirect()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const activeDeviceDetached = deviceDetachedEvents.some(
        ({ id }) => activeDeviceId === id
      )

      if (activeDeviceDetached) {
        await modalService.closeModal(true)

        if (activeDeviceProcessing) {
          return
        }

        if (downloadProcessing) {
          await dispatch(deactivateDevice())
          cancelOsDownload()
          history.push(URL_ONBOARDING.welcome)
          return
        }

        await deactivateDeviceAndRedirect()
      }
    },
    [
      history,
      dispatch,
      activeDeviceId,
      activeDeviceProcessing,
      downloadProcessing,
      deactivateDeviceAndRedirect,
    ]
  )
}

const useProcessSingleDeviceRemaining = () => {
  const history = useHistory()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const devices = useSelector(getDevicesSelector)

  return useCallback(
    (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const devicesLeftAfterDetach =
        devices.length - deviceDetachedEvents.length

      if (
        !activeDeviceProcessing &&
        activeDeviceId === undefined &&
        devicesLeftAfterDetach === 1
      ) {
        history.push(URL_DISCOVERY_DEVICE.root)
        return
      }
    },
    [history, activeDeviceId, activeDeviceProcessing, devices.length]
  )
}
