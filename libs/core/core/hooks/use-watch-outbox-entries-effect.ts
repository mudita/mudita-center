/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { useEffect } from "react"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { readOutboxEntriesRequest } from "Core/outbox/requests"
import { readAllIndexes } from "Core/data-sync/actions"
import store, { Dispatch } from "Core/__deprecated__/renderer/store"
import { resourceTypeMap } from "Core/notification/constants/resource-type-map.constant"
import { pushNotification } from "Core/notification/actions"
import { v4 as uuid } from "uuid"
import { NotificationMethod, NotificationType } from "Core/notification/constants"
import { getActiveDeviceTypeSelector } from "Core/device-manager/selectors/get-active-device-type.selector"
import { DeviceType } from "Core/device"

const outboxTime = 10000

export const useWatchOutboxEntriesEffect = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceType = useSelector(getActiveDeviceTypeSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if(activeDeviceType !== DeviceType.MuditaPure){
      return
    }

    if (deviceInitializationStatus === DeviceInitializationStatus.Initialized) {
      intervalId = setInterval(async () => {
        const updatedData = await readOutboxEntriesRequest()

        if (updatedData) {
          dispatch(readAllIndexes())
          updatedData.forEach((item) => {
            void store.dispatch(
              pushNotification({
                id: uuid(),
                method: NotificationMethod.Layout,
                type: NotificationType.Info,
                resourceType: resourceTypeMap[item.entry.type],
                content: item.payload,
              })
            )
          })
        }
      }, outboxTime)
    }

    return () => clearInterval(intervalId)
  }, [dispatch, activeDeviceType, deviceInitializationStatus])
}
