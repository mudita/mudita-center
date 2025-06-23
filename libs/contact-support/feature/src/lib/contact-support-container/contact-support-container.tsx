/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { AppState } from "app-store/models"
import { ContactSupportFlow } from "contact-support/ui"
import {
  closeContactSupportFlow,
  sendTicket,
} from "../store/contact-support.actions"
import { files } from "contact-support/models"

const mapStateToProps = (state: AppState) => ({
  files: files,
  status: state.contactSupport.sendTicket.status,
})

const mapDispatchToProps = {
  closeContactSupportFlow,
  sendTicket,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactSupportFlow)
