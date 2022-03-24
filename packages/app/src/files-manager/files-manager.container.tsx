/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "Renderer/store"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  memorySpace: state.device.data?.memorySpace,
  musicFiles: state.filesManager.files,
  resultState: state.filesManager.resultState,
})

export default connect(mapStateToProps, null)(FilesManager)
