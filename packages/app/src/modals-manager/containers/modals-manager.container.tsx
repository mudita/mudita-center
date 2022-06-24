/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import ModalsManager from "App/modals-manager/components/modals-manager.component"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return state.modalsManager
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  updateOnlineStatus: () => dispatch.networkStatus.updateOnlineStatus(),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalsManager)
