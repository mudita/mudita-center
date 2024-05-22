/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, Selector, OutputSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  NotificationMethod,
  NotificationResourceType,
} from "Core/notification/constants"
import { Notification } from "Core/notification/types"
import { NotificationState } from "Core/notification/reducers"

export const notificationsSelector: Selector<
  ReduxRootState,
  NotificationState
> = (state) => state.notification

export const getNotificationByResourceAndMethod = (
  resource: NotificationResourceType,
  method: NotificationMethod
): OutputSelector<
  ReduxRootState,
  Notification[],
  (res: NotificationState) => Notification[]
> => {
  return createSelector<ReduxRootState, NotificationState, Notification[]>(
    notificationsSelector,
    (state) => {
      return state.data.filter(
        (item) => item.method === method && item.resourceType === resource
      )
    }
  )
}
