/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessagesEvent {
  ToggleThreadReadStatus = "TOGGLE_THREAD_READ_STATUS",
  MarkThreadAsRead = "MARK_THREAD_AS_READ",

  MarkThreadsReadStatus = "MARK_THREADS_READ_STATUS",

  DeleteThreads = "DELETE_THREADS",
  AddNewMessage = "ADD_NEW_MESSAGE",
  ClearAllThreads = "CLEAR_ALL_THREADS",
  HideDeleteModal = "HIDE_DELETE_MODAL",

  // TODO: move to UI? :think:
  ChangeVisibilityFilter = "CHANGE_VISIBILITY_FILTER",
  ChangeSearchValue = "CHANGE_SEARCH_VALUE",
}
