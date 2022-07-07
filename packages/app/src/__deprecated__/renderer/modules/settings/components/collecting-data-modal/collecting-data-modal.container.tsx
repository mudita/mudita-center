/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import CollectingDataModal from "App/__deprecated__/renderer/modules/settings/components/collecting-data-modal/collecting-data-modal.component"
import { hideCollectingDataModal } from "App/modals-manager/actions"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  closeModal: () => dispatch(hideCollectingDataModal()),

  // TODO refactor legacy staff
  toggleAppCollectingData: dispatch.settings.toggleAppCollectingData,
})

export default connect(undefined, mapDispatchToProps)(CollectingDataModal)
