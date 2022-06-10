/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import { hideModals } from "App/modals-manager/actions"
import AppUpdateFlow from "App/__deprecated__/renderer/modules/settings/components/app-update-flow.component"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    appLatestVersion: state.settings.appLatestVersion,
    appCurrentVersion: state.settings.appCurrentVersion,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  closeModal: () => dispatch(hideModals()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppUpdateFlow)
