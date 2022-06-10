/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import About from "App/__deprecated__/renderer/modules/settings/tabs/about/about.component"
import { ReduxRootState, RootState, TmpDispatch } from "App/__deprecated__/renderer/store"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    appLatestVersion: state.settings.appLatestVersion,
    appCurrentVersion: state.settings.appCurrentVersion,
    appUpdateAvailable: state.settings.appUpdateAvailable,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  toggleAppUpdateAvailable: (value: boolean) =>
    dispatch.settings.toggleAppUpdateAvailable(value),
  checkAppUpdateAvailable: () => dispatch.settings.checkAppUpdateAvailable(),
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
