/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NotificationResourceType } from "App/notification/constants"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { Notification } from "App/notification/types"

export const isNotificationOutboxMessage = (
  notification: Notification
): boolean => {
  const isMessage =
    notification.resourceType === NotificationResourceType.Message
  const isOutboxMessage =
    (notification.content as Message).messageType === MessageType.OUTBOX

  return isMessage && isOutboxMessage
}
