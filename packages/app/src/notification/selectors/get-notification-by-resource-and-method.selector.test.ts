/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { notificationReducer, initialState } from "App/notification/reducers"
import { Notification } from "App/notification/types"
import { getNotificationByResourceAndMethod } from "App/notification/selectors"
import {
  NotificationType,
  NotificationResourceType,
  NotificationMethod,
} from "App/notification/constants"

describe("`getNotificationByResourceAndMethod` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      notification: notificationReducer(initialState, {} as any),
    } as ReduxRootState
    expect(
      getNotificationByResourceAndMethod(
        NotificationResourceType.Message,
        NotificationMethod.Layout
      )(state)
    ).toHaveLength(0)
  })

  test("when notifications exists selector returns list of match notifications", () => {
    const matchNotifications: Notification = {
      id: "1234",
      type: NotificationType.Success,
      method: NotificationMethod.Layout,
      resourceType: NotificationResourceType.Message,
      content: null,
    }
    const notMatchNotifications: Notification = {
      id: "1234",
      type: NotificationType.Success,
      method: NotificationMethod.Popup,
      resourceType: NotificationResourceType.Contact,
      content: null,
    }
    const state = {
      notification: notificationReducer(
        {
          ...initialState,
          data: [matchNotifications, notMatchNotifications],
        },
        {} as any
      ),
    } as ReduxRootState
    expect(
      getNotificationByResourceAndMethod(
        NotificationResourceType.Message,
        NotificationMethod.Layout
      )(state)
    ).toEqual([matchNotifications])
  })
})
