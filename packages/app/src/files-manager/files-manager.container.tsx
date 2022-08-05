/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { getFiles } from "App/files-manager/actions"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  memorySpace: state.device.data?.memorySpace,
  files: state.filesManager.files,
  resultState: state.filesManager.resultState,
  deviceType: state.device.deviceType,
})

const mapDispatchToProps = {
  getFiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesManager)
