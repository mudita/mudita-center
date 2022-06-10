/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootState, ReduxRootState } from "App/__deprecated__/renderer/store"
import PureSystem from "App/overview/components/pure-system/pure-system.component"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    serialNumber: state.device.data?.serialNumber,
  }
}

export default connect(mapStateToProps)(PureSystem)
