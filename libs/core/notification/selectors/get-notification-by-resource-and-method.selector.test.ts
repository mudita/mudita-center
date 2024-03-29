/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { notificationReducer, initialState } from "Core/notification/reducers"
import { Notification } from "Core/notification/types"
import { getNotificationByResourceAndMethod } from "Core/notification/selectors"
import {
  NotificationType,
  NotificationResourceType,
  NotificationMethod,
} from "Core/notification/constants"

describe("`getNotificationByResourceAndMethod` selector", () => {
  test("when initial state is set selector returns empty array", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
