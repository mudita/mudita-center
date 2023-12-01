/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import ContactSupportFlow from "App/contact-support/components/contact-support-flow.component"
import { files } from "App/contact-support/reducers"
import { sendTicket } from "App/contact-support/actions/send-ticket.action"
import { closeContactSupportFlow } from "App/contact-support/actions/close-contact-support-flow.action"

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  files: files,
  state: state.contactSupport.state,
})

const mapDispatchToProps = {
  closeContactSupportFlow,
  sendTicket,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactSupportFlow)
