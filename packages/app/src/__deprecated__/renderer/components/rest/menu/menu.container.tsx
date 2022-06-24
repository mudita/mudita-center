/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Menu from "App/__deprecated__/renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "App/__deprecated__/renderer/store"
import { UpdatingState } from "App/device/constants"
import { RestoreDeviceDataState } from "App/restore-device/reducers"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  deviceFeaturesVisible:
    (state.device.status.connected && state.device.status.unlocked) ||
    state.device.updatingState === UpdatingState.Updating ||
    state.restoreDevice.state === RestoreDeviceDataState.Running ||
    state.restoreDevice.state === RestoreDeviceDataState.Error,
  devModeEnabled: state.devMode.enabled,
  syncState: state.dataSync.state,
})

export default connect(mapStateToProps)(Menu)
