/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.component"

// TODO replace any with legit `Dispatch`
const mapDispatchToProps = (dispatch: any) => ({
  updateOnlineStatus: () => dispatch.networkStatus.updateOnlineStatus(),
})

export default connect(null, mapDispatchToProps)(NetworkStatusChecker)
