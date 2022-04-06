/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "messages"

export enum IpcMessageEvent {
  CreateMessage = "create-message",
  GetMessagesByThreadId = "get-messages-by-thread-id",
  GetThreads = "get-threads",
}

export enum IpcMessageRequest {
  CreateMessage = "messages-create-message",
  GetMessagesByThreadId = "messages-get-messages-by-thread-id",
  GetThreads = "messages-get-threads",
}
