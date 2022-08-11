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
} from "App/files-manager/actions"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  memorySpace: state.device.data?.memorySpace,
  files: state.filesManager.files,
  loading: state.filesManager.loading,
  uploading: state.filesManager.uploading,
  deviceType: state.device.deviceType,
  error: state.templates.error,
  selectedItems: state.filesManager.selectedItems.rows,
  allItemsSelected:
    state.filesManager.selectedItems.rows.length ===
    state.filesManager.files.length,
})

const mapDispatchToProps = {
  getFiles,
  resetAllItems,
  selectAllItems,
  toggleItem,
  uploadFile,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesManager)
