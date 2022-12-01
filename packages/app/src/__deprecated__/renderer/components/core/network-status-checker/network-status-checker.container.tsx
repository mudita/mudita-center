/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import NetworkStatusChecker from "App/__deprecated__/renderer/components/core/network-status-checker/network-status-checker.component"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  updateOnlineStatus: () => dispatch.networkStatus.updateOnlineStatus(),
})

export default connect(null, mapDispatchToProps)(NetworkStatusChecker)
