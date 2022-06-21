/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessagesEvent {
  ToggleThreadsReadStatus = "TOGGLE_THREADS_READ_STATUS",
  MarkThreadsReadStatus = "MARK_THREADS_READ_STATUS",

  DeleteThreads = "DELETE_THREADS",
  AddNewMessage = "ADD_NEW_MESSAGE",
  ClearAllThreads = "CLEAR_ALL_THREADS",
  HideDeleteModal = "HIDE_DELETE_MODAL",
  HideMessageDeleteModal = "HIDE_MESSAGE_DELETE_MODAL",
  DeleteMessage = "DELETE_MESSAGE",

  // TODO: move to UI? :think:
  ChangeVisibilityFilter = "CHANGE_VISIBILITY_FILTER",
  ChangeSearchValue = "CHANGE_SEARCH_VALUE",
}
