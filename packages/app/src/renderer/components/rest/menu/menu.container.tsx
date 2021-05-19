/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Menu from "Renderer/components/rest/menu/menu.component"
import { RootState, select } from "Renderer/store"

const selection = select((models: any) => ({
  pureFeaturesVisible: models.basicInfo.pureFeaturesVisible,
}))

const mapStateToProps = (state: RootState) => ({
  ...selection(state, null),
  devModeEnabled: state.devMode.enabled,
})

export default connect(mapStateToProps)(Menu)
