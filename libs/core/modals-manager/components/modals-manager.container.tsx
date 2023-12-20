/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import ModalsManager from "Core/modals-manager/components/modals-manager.component"
import { hideModals } from "Core/modals-manager"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    ...state.modalsManager,
    deviceInitializationFailedModalShowEnabled: false,
  }
}

const mapDispatchToProps = {
  hideModals,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsManager)
