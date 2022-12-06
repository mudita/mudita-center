/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { State } from "App/core/constants"
import Menu from "App/__deprecated__/renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "App/__deprecated__/renderer/store"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  deviceFeaturesVisible:
    (state.device.status.connected && state.device.status.unlocked) ||
    state.update.updateOsState === State.Loading ||
    state.backup.restoringState === State.Loading ||
    state.backup.restoringState === State.Failed,
  devModeEnabled: state.devMode.enabled,
  syncState: state.dataSync.state,
})

export default connect(mapStateToProps)(Menu)
