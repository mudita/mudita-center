/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import CollectingDataModal from "App/collecting-data-modal/collecting-data-modal.component"
import { connect } from "react-redux"

const mapDispatchToProps = (dispatch: any) => ({
  onActionButtonClick: () => dispatch.settings.setCollectingData(true),
  closeModal: () => dispatch.settings.setCollectingData(false)
})

const CollectingModal = connect(null, mapDispatchToProps)(CollectingDataModal)

export default CollectingModal
