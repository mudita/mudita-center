/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { hideModals } from "App/modals-manager/actions"
import { AppForcedUpdateFlow } from "App/settings/components/app-forced-update-flow/app-forced-update-flow.component"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    appLatestVersion: state.settings.latestVersion,
    appCurrentVersion: state.settings.currentVersion,
  }
}

const mapDispatchToProps = {
  hideModals,
}

export const AppForcedUpdateFlowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppForcedUpdateFlow)
