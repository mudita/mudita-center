/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { NotificationEvent } from "App/notification/constants"
import {
  NotificationState,
  PushNotificationAction,
  RemoveNotificationAction,
} from "App/notification/reducers/notification.interface"

export const initialState: NotificationState = {
  data: [],
}

export const notificationReducer = createReducer<NotificationState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        NotificationEvent.PushEvent,
        (state, action: PushNotificationAction) => {
          return {
            ...state,
            data: [...state.data, action.payload],
          }
        }
      )
      .addCase(
        NotificationEvent.RemoveEvent,
        (state, action: RemoveNotificationAction) => {
          return {
            ...state,
            data: [...state.data.filter((item) => item.id !== action.payload)],
          }
        }
      )
  }
)
