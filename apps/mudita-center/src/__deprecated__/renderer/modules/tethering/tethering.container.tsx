/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Tethering from "App/__deprecated__/renderer/modules/tethering/tethering.component"
import { RootState, ReduxRootState } from "App/__deprecated__/renderer/store"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  deviceUnlocked: Boolean(state.device.status.unlocked),
})

export default connect(mapStateToProps)(Tethering)
