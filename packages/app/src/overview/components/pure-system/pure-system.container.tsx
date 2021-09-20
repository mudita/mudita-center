/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootState } from "Renderer/store"
import PureSystem from "App/overview/components/pure-system/pure-system.component"

const mapStateToProps = (state: RootState) => {
  return {
    serialNumber: state.basicInfo.serialNumber,
	}
}

export default connect(mapStateToProps)(PureSystem)
