/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { State } from "Core/core/constants"
import Menu from "Core/__deprecated__/renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    deviceFeaturesVisible:
      (state.device.status.connected &&
        state.device.status.unlocked &&
        state.update.checkedForForceUpdateNeed &&
        !(
          state.update.needsForceUpdate &&
          state.update.checkForUpdateState === CheckForUpdateState.Failed
        )) ||
      state.update.updateOsState === State.Loading ||
      state.backup.restoringState === State.Loading ||
      state.backup.restoringState === State.Failed ||
      state.backup.backingUpState === State.Loading,
    devModeEnabled: state.devMode.enabled,
    syncState: state.dataSync.state,
    synchronizationProcess: state.dataSync.synchronizationProcess,
    menuItems: state.genericViews.menu,
  }
}

export default connect(mapStateToProps)(Menu)
