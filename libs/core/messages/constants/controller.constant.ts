/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcMessageEvent {
  CreateMessage = "message_create-message",
  DeleteMessage = "message_delete-message",
  ResendMessage = "message_resend-message",
  UpdateMessage = "message_update-message",
}

export enum IpcThreadEvent {
  DeleteThreads = "thread_delete-threads",
  ToggleThreadsReadStatus = "thread_toggle-threads-read-status",
}
