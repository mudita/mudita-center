/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { Settings } from "App/settings/components"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { toggleTethering } from "App/settings/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  autostart: state.settings.autostart,
  tethering: state.settings.tethering,
})

const mapDispatchToProps = {
  toggleTethering,
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
