/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { registerDeviceDetachedListener } from "Core/device-manager/listeners"
import { handleDeviceDetached } from "Core/device-manager/actions/handle-device-detached.action"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"

export const useDeviceDetachedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(activeDeviceIdSelector)

  const handleDeviceDetachedHandler = useCallback(
    async (properties: DeviceBaseProperties) => {
      // handle deprecated contact modal
      if (activeDeviceId === properties.id) {
        await modalService.closeModal(true)
      }

      await dispatch(handleDeviceDetached({ properties, history }))
    },
    [activeDeviceId, dispatch, history]
  )

  useEffect(() => {
    const handler = async (properties: DeviceBaseProperties) => {
      await handleDeviceDetachedHandler(properties)
    }

    const unregister = registerDeviceDetachedListener(handler)
    return () => {
      unregister()
    }
  }, [handleDeviceDetachedHandler, dispatch, history])
}
