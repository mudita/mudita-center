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
} from "App/files-manager/actions"
import { deleteFiles } from "App/files-manager/actions/delete-files.action"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  memorySpace: state.device.data?.memorySpace,
  files: state.filesManager.files,
  loading: state.filesManager.loading,
  deleting: state.filesManager.deleting,
  uploading: state.filesManager.uploading,
  uploadingFileLength: state.filesManager.uploadingFileLength,
  deviceType: state.device.deviceType,
  error: state.templates.error,
  selectedItems: state.filesManager.selectedItems.rows,
  allItemsSelected:
    state.filesManager.selectedItems.rows.length ===
    state.filesManager.files.length,
  uploadBlocked: state.filesManager.uploadBlocked,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesManager)
