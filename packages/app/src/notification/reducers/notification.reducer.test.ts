/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  NotificationEvent,
  NotificationType,
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { Notification } from "App/notification/types"
import { Message, MessageType } from "App/messages/reducers"
// import { NotificationState } from "./notification.interface"
import { notificationReducer, initialStateState } from "./notification.reducer"

const message: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const notificationPayload: Notification = {
  id: "1234",
  type: NotificationType.Success,
  method: NotificationMethod.Layout,
  resourceType: NotificationResourceType.Message,
  content: message,
}

describe("Event: none", () => {
  test("returns initial state", () => {
    expect(
      notificationReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialStateState)
  })
})

describe("Event: PushEvent", () => {
  test("adds new notification to `data`", () => {
    expect(
      notificationReducer(undefined, {
        type: NotificationEvent.PushEvent,
        payload: notificationPayload,
      })
    ).toEqual({
      data: [notificationPayload],
    })
  })
})

describe("Event: RemoveEvent", () => {
  test("remove  notification from `data`", () => {
    expect(
      notificationReducer(
        {
          data: [notificationPayload],
        },
        {
          type: NotificationEvent.RemoveEvent,
          payload: "1234",
        }
      )
    ).toEqual({
      data: [],
    })
  })
})
