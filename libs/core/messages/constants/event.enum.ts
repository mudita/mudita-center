/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessagesEvent {
  ToggleThreadsReadStatus = "TOGGLE_THREADS_READ_STATUS",
  MarkThreadsReadStatus = "MARK_THREADS_READ_STATUS",

  DeleteThreads = "DELETE_THREADS",
  AddNewMessage = "ADD_NEW_MESSAGE",
  UpdateMessage = "UPDATE_MESSAGE",
  ResendMessage = "RESEND_MESSAGE",
  ClearAllThreads = "CLEAR_ALL_THREADS",
  DeleteMessage = "DELETE_MESSAGE",

  // TODO: move to UI? :think:
  // Yes!
  ChangeVisibilityFilter = "CHANGE_VISIBILITY_FILTER",
  ChangeSearchValue = "CHANGE_SEARCH_VALUE",
  SelectAll = "SELECT_ALL",
  ResetItems = "RESET_ITEMS",
  ToggleItem = "TOGGLE_ITEM",
}
