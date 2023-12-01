/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, Selector, OutputSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { Notification } from "App/notification/types"
import { NotificationState } from "App/notification/reducers"

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
