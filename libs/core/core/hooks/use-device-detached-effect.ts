/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
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
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"
import { useRedirectOnActiveDeviceDetached } from "Core/overview/components/overview-screens/pure-overview/use-redirect-on-active-device-detached.hook"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { setSelectDeviceDrawerOpen } from "Core/device-select/actions/set-select-device-drawer-open.action"

export const useDeviceDetachedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const downloadProcessing = useSelector(
    ({ update }: ReduxRootState) => update.downloadState
  )
  const devices = useSelector(getDevicesSelector)
  const redirectOnActiveDeviceDetached = useRedirectOnActiveDeviceDetached()

  useEffect(() => {
    return registerDeviceDetachedListener(
      async (properties: DeviceBaseProperties) => {
        dispatch(removeDevice(properties))

        if (devices.length < 2) {
          dispatch(setSelectDeviceDrawerOpen(false))
        }

        if (activeDeviceId !== properties.id) {
          return
        }

        // handle deprecated contact modal
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
        redirectOnActiveDeviceDetached()
      }
    )
  }, [
    devices,
    activeDeviceId,
    activeDeviceProcessing,
    downloadProcessing,
    dispatch,
    history,
    redirectOnActiveDeviceDetached,
  ])
}
