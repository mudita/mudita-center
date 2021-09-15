/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Tethering from "Renderer/modules/tethering/tethering.component"
import { RootState, ReduxRootState } from "Renderer/store"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  deviceUnlocked: !state.device.status.locked,
})

export default connect(mapStateToProps)(Tethering)
