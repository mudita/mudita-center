/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState, TmpDispatch } from "Renderer/store"
import CollectingDataModal from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal.component"
import { hideCollectingDataModal } from "App/modals-manager/actions"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    collectingDataModalShow: state.modalsManager.collectingDataModalShow
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  hideCollectingDataModal: () => dispatch(hideCollectingDataModal()),

  // TODO refactor legacy staff
  toggleAppCollectingData: dispatch.settings.toggleAppCollectingData,
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectingDataModal)
