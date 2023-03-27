/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import {
  resetAllItems,
  selectAllItems,
  toggleItem,
  getFiles,
  uploadFile,
  resetDeletingState,
  resetUploadingState,
  setDeletingFileCount,
} from "App/files-manager/actions"
import { deleteFiles } from "App/files-manager/actions/delete-files.action"
import { abortPendingUpload } from "./actions/abort-pending-upload.action"
import { continuePendingUpload } from "./actions/continue-pending-upload.action"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  memorySpace: state.device.data?.memorySpace,
  files: state.filesManager.files,
  loading: state.filesManager.loading,
  deleting: state.filesManager.deleting,
  uploading: state.filesManager.uploading,
  uploadingFileCount: state.filesManager.uploadingFileCount,
  deletingFileCount: state.filesManager.deletingFileCount,
  deviceType: state.device.deviceType,
  error: state.filesManager.error,
  selectedItems: state.filesManager.selectedItems.rows,
  allItemsSelected:
    state.filesManager.selectedItems.rows.length ===
    state.filesManager.files.length,
  uploadBlocked: state.filesManager.uploadBlocked,
  pendingFilesCount: state.filesManager.uploadPendingFiles.length,
})

const mapDispatchToProps = {
  getFiles,
  resetAllItems,
  selectAllItems,
  toggleItem,
  uploadFile,
  deleteFiles,
  resetDeletingState,
  resetUploadingState,
  setDeletingFileCount,
  abortPendingUpload,
  continuePendingUpload,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesManager)
