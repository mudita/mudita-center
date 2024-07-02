/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { useEffect } from "react"
import { v4 as uuid } from "uuid"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { readOutboxEntriesRequest } from "Core/outbox/requests"
import { readAllIndexes } from "Core/data-sync/actions"
import { resourceTypeMap } from "Core/notification/constants/resource-type-map.constant"
import { pushNotification } from "Core/notification/actions"
import {
  NotificationMethod,
  NotificationType,
} from "Core/notification/constants"
import { getActiveDeviceTypeSelector } from "device-manager/feature"
import { DeviceType } from "device-protocol/models"

const outboxIntervalTime = 10000

export const useWatchOutboxEntriesEffect = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)

  useEffect(() => {
    if (activeDeviceType !== DeviceType.MuditaPure) {
      return
    }

    if (deviceInitializationStatus !== DeviceInitializationStatus.Initialized) {
      return
    }

    const intervalId = setInterval(async () => {
      const updatedItems = await readOutboxEntriesRequest()

      if (!updatedItems) {
        return
      }

      dispatch(readAllIndexes())

      updatedItems.forEach((item) => {
        const notification = {
          id: uuid(),
          method: NotificationMethod.Layout,
          type: NotificationType.Info,
          resourceType: resourceTypeMap[item.entry.type],
          content: item.payload,
        }

        void dispatch(pushNotification(notification))
      })
    }, outboxIntervalTime)

    return () => clearInterval(intervalId)
  }, [dispatch, activeDeviceType, deviceInitializationStatus])
}
