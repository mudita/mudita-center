/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { answerMain, useDebouncedEventsHandler } from "shared/utils"
import { DeviceBaseProperties } from "device-protocol/models"
import { getDevicesSelector } from "device-manager/feature"
import { selectDialogOpenState } from "shared/app-state"
import { DeviceProtocolMainEvent } from "device-protocol/models"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { deactivateDevice } from "device-manager/feature"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { cancelOsDownload } from "Core/update/requests"
import {
  URL_DISCOVERY_DEVICE,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { useDeactivateDeviceAndRedirect } from "Core/overview/components/overview-screens/pure-overview/use-deactivate-device-and-redirect.hook"
import { closeContactSupportFlow } from "Core/contact-support"
import { abortFlashingProcess } from "../../../msc-flash/msc-flash-harmony/src"

export const useDeviceDetachedEffect = () => {
  const handleDevicesDetached = useHandleDevicesDetached()

  const batchDeviceDetachedEvents =
    useDebouncedEventsHandler<DeviceBaseProperties>(handleDevicesDetached)

  useEffect(() => {
    return answerMain(
      DeviceProtocolMainEvent.DeviceDetached,
      batchDeviceDetachedEvents
    )
  }, [batchDeviceDetachedEvents])
}

const useHandleDevicesDetached = () => {
  const dispatch = useDispatch<Dispatch>()
  const processActiveDevicesDetachment = useProcessActiveDevicesDetachment()
  const processSingleDeviceRemaining = useProcessSingleDeviceRemaining()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      await processActiveDevicesDetachment(deviceDetachedEvents)
      processSingleDeviceRemaining(deviceDetachedEvents)
    },
    [processActiveDevicesDetachment, processSingleDeviceRemaining]
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
  const flashingProcessing = true

  const deactivateDeviceAndRedirect = useDeactivateDeviceAndRedirect()

  return useCallback(
    async (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const activeDeviceDetached = deviceDetachedEvents.some(
        ({ id }) => activeDeviceId === id
      )

      if (activeDeviceDetached) {
        dispatch(closeContactSupportFlow())
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

        if (flashingProcessing) {
          console.log("Wchodzę tutaj do aborta")
          dispatch(abortFlashingProcess())
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
  const dialogOpen = useSelector(selectDialogOpenState)

  return useCallback(
    (deviceDetachedEvents: DeviceBaseProperties[]) => {
      const devicesLeftAfterDetach =
        devices.length - deviceDetachedEvents.length

      if (
        !activeDeviceProcessing &&
        activeDeviceId === undefined &&
        devicesLeftAfterDetach === 1 &&
        !dialogOpen
      ) {
        history.push(URL_DISCOVERY_DEVICE.root)
        return
      }
    },
    [
      dialogOpen,
      history,
      activeDeviceId,
      activeDeviceProcessing,
      devices.length,
    ]
  )
}
