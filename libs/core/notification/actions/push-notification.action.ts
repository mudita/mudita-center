/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { NotificationEvent } from "Core/notification/constants"
import { Notification } from "Core/notification/types"

export const pushNotification = createAction<Notification>(
  NotificationEvent.PushEvent
)
