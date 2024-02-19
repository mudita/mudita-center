/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NotificationResourceType } from "App/notification/constants"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { Notification } from "App/notification/types"

const isContentMessage = (
  notification: Notification
): notification is Notification<Message> => {
  return notification.resourceType === NotificationResourceType.Message
}

export const isNotificationOutboxMessage = (
  notification: Notification
): boolean => {
  if (isContentMessage(notification)) {
    return notification.content?.messageType === MessageType.OUTBOX
  } else {
    return false
  }
}
