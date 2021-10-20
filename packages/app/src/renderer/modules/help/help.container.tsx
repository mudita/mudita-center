/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Renderer/store"
import Help from "Renderer/modules/help/help.component"

const mapStateToProps = (state: ReduxRootState) => {
  return {
    serialNumber: state.device.data?.serialNumber,
  }
}

export default connect(mapStateToProps)(Help)
