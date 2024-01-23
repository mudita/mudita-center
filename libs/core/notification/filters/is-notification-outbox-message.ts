/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NotificationResourceType } from "Core/notification/constants"
import { Message } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants"
import { Notification } from "Core/notification/types"

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
