/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import Help from "Renderer/modules/help/help.component"

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  return {
    serialNumber: state.device.data?.serialNumber,
  }
}

export default connect(mapStateToProps)(Help)
