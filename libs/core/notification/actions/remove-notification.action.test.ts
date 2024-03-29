/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import {
  NotificationEvent,
  NotificationType,
  NotificationMethod,
  NotificationResourceType,
} from "Core/notification/constants"
import { Notification } from "Core/notification/types"
import { Message } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants"
import { removeNotification } from "./remove-notification.action"

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

const mockStore = createMockStore([thunk])({
  notification: {
    data: [notificationPayload],
  },
})

test("fire `removeNotification` action dispatch NotificationEvent.RemoveEvent event", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await mockStore.dispatch(removeNotification("1234") as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    {
      type: NotificationEvent.RemoveEvent,
      payload: "1234",
    },
  ])
})
