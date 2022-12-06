/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { About } from "App/settings/components/about/about.component"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import {
  toggleApplicationUpdateAvailable,
  checkUpdateAvailable,
} from "App/settings/actions"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    latestVersion: state.settings.latestVersion,
    currentVersion: state.settings.currentVersion,
    updateAvailable: state.settings.updateAvailable,
  }
}

const mapDispatchToProps = {
  toggleApplicationUpdateAvailable,
  checkUpdateAvailable,
}

export const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
