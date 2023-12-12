/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FilesManagerEvent {
  GetFiles = "FILES_MANAGER_GET_FILES",
  SetFiles = "FILES_MANAGER_SET_FILES",
  SelectAllItems = "FILES_MANAGER_SELECT_ALL",
  ToggleItem = "FILES_MANAGER_TOGGLE_ITEM",
  ResetAllItems = "FILES_MANAGER_RESET_ALL_ITEMS",
  UploadFiles = "FILES_MANAGER_UPLOAD_FILES",
  DeleteFiles = "FILES_MANAGER_DELETE_FILES",
  SetUploadingState = "FILES_MANAGER_SET_UPLOADING_STATE",
  ResetDeletingState = "FILES_MANAGER_RESET_DELETING_STATE",
  ResetUploadingState = "FILES_MANAGER_RESET_UPLOADING_STATE",
  ResetUploadingStateAfterSuccess = "FILES_MANAGER_RESET_UPLOADING_STATE_AFTER_SUCCESS",
  SetUploadingFileCount = "FILES_MANAGER_SET_UPLOADING_FILE_COUNT",
  SetUploadBlocked = "FILES_MANAGER_SET_UPLOAD_BLOCKED",
  SetDeletingFileCount = "FILES_MANAGER_SET_DELETING_FILE_COUNT",
  SetPendingFilesToUpload = "FILES_MANAGER_SET_PENDING_FILES_TO_UPLOAD",
  AbortPendingUpload = "FILES_MANAGER_ABORT_PENDING_UPLOAD",
  ContinuePendingUpload = "FILES_MANAGER_CONTINUE_PENDING_UPLOAD",
  SetDuplicatedFiles = "FILES_MANAGER_SET_DUPLICATED_FILES",
  SetInvalidFiles = "FILES_MANAGER_SET_INVALID_FILES",
  ResetFiles = "FILES_MANAGER_RESET_FILES",
}
