/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import ModalsManager from "App/modals-manager/components/modals-manager.component"
import { hideModals } from "App/modals-manager"
import { deviceInitializationFailedModalShowEnabledSelector } from "App/modals-manager/selectors"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    ...state.modalsManager,
    deviceInitializationFailedModalShowEnabled:
      deviceInitializationFailedModalShowEnabledSelector(state),
  }
}

const mapDispatchToProps = {
  hideModals,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsManager)
