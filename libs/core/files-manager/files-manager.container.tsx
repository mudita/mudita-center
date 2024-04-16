/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import FilesManager from "Core/files-manager/components/files-manager/files-manager.component"
import {
  resetAllItems,
  selectAllItems,
  toggleItem,
  getFiles,
  resetDeletingState,
  resetUploadingState,
  setDeletingFileCount,
  resetUploadingStateAfterSuccess,
} from "Core/files-manager/actions"
import { deleteFiles } from "Core/files-manager/actions/delete-files.action"

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
    (state.filesManager.files?.length ?? 0),
  uploadBlocked: state.filesManager.uploadBlocked,
})

const mapDispatchToProps = {
  getFiles,
  resetAllItems,
  selectAllItems,
  toggleItem,
  deleteFiles,
  resetDeletingState,
  resetUploadingState,
  resetUploadingStateAfterSuccess,
  setDeletingFileCount
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesManager)
