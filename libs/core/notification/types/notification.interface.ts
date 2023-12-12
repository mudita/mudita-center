/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  NotificationType,
  NotificationMethod,
  NotificationResourceType,
} from "Core/notification/constants"

export interface Notification {
  id: string
  type: NotificationType
  method: NotificationMethod
  resourceType: NotificationResourceType
  content: unknown
}
