/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import Help from "Core/help/components/help.component"
import { ModalStateKey, showModal } from "Core/modals-manager"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  openContactSupportFlow: () =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
})

export default connect(undefined, mapDispatchToProps)(Help)
