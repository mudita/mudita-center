/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState, ReduxRootState } from "Renderer/store"
import { UpdatingState } from "App/device/constants"
import { RestoreDeviceDataState } from "App/restore-device/reducers"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  pureFeaturesVisible:
    (state.device.status.connected && !state.device.status.locked) ||
    state.device.updatingState === UpdatingState.Updating ||
    state.restoreDevice.state === RestoreDeviceDataState.Running,
  devModeEnabled: state.devMode.enabled,
})

export default connect(mapStateToProps)(Menu)
