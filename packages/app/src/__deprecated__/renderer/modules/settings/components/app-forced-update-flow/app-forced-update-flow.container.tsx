/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { hideModals } from "App/modals-manager/actions"
import AppForcedUpdateFlow from "App/__deprecated__/renderer/modules/settings/components/app-forced-update-flow/app-forced-update-flow.component"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    appLatestVersion: state.settings.appLatestVersion,
    appCurrentVersion: state.settings.appCurrentVersion,
  }
}

const mapDispatchToProps = {
  hideModals,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppForcedUpdateFlow)
