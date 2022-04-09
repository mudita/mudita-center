/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const MessageControllerPrefix = "message"

export enum IpcMessageEvent {
  CreateMessage = "create-message",
}

export enum IpcMessageRequest {
  CreateMessage = "message-create-message",
}

export const ThreadControllerPrefix = "thread"

export enum IpcThreadEvent {
  GetThreads = "get-threads",
}

export enum IpcThreadRequest {
  GetThreads = "thread-get-threads",
}
