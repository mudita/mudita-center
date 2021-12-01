/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TmpDispatch } from "Renderer/store"
import { connect } from "react-redux"
import Troubleshooting from "App/troubleshooting/troubleshooting.component"
import { ModalStateKey, showModal } from "App/modals-manager"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  openContactSupportFlow: () =>
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
})

export default connect(undefined, mapDispatchToProps)(Troubleshooting)
