/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Menu from "Core/__deprecated__/renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    deviceFeaturesVisible:
      state.deviceInitialization.deviceInitializationStatus ===
      DeviceInitializationStatus.Initialized,
    devModeEnabled: state.devMode.enabled,
    syncState: state.dataSync.state,
    synchronizationProcess: state.dataSync.synchronizationProcess,
  }
}

export default connect(mapStateToProps)(Menu)
