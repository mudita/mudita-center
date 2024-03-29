/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { Notification } from "Core/notification/types"
import { NotificationEvent } from "Core/notification/constants"

export interface NotificationState {
  data: Notification[]
}

export type PushNotificationAction = PayloadAction<
  Notification,
  NotificationEvent.PushEvent
>

export type RemoveNotificationAction = PayloadAction<
  string,
  NotificationEvent.RemoveEvent
>
