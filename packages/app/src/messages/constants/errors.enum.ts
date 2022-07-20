/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessagesError {
  LoadThreads = "LOAD_THREADS_DATA_ERROR",
  LoadMessagesById = "LOAD_MESSAGES_DATA_BY_ID_ERROR",
  AddNewMessage = "ADD_NEW_MESSAGE_ERROR",
  UpdateMessageError = "UPDATE_MESSAGE_ERROR",
  DeleteMessage = "DELETE_MESSAGE_ERROR",
  ToggleThreadsReadStatus = "TOGGLE_THREADS_READ_STATUS_ERROR",
  MarkThreadsReadStatus = "MARK_THREADS_READ_STATUS_ERROR",
  ResendMessageError = "RESEND_MESSAGE_ERROR",
}
