/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Menu from "Core/__deprecated__/renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { isDataSyncInProgressSelector } from "Core/data-sync/selectors/is-data-sync-in-progress.selector"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    deviceFeaturesVisible:
      state.deviceInitialization.deviceInitializationStatus ===
      DeviceInitializationStatus.Initialized,
    dataSyncInProgress: isDataSyncInProgressSelector(state),
  }
}

export default connect(mapStateToProps)(Menu)
