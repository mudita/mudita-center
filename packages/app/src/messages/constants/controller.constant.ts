/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const MessageControllerPrefix = "message"

export enum IpcMessageEvent {
  CreateMessage = "create-message",
  GetMessagesByThreadId = "get-messages-by-thread-id",
}

export enum IpcMessageRequest {
  CreateMessage = "message-create-message",
  GetMessagesByThreadId = "message-get-messages-by-thread-id",
}

export const ThreadControllerPrefix = "thread"

export enum IpcThreadEvent {
  GetThreads = "get-threads",
}

export enum IpcThreadRequest {
  GetThreads = "thread-get-threads",
}
