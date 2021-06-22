/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { noop } from "Renderer/utils/noop"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { useState } from "react"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "App/contacts/components/contact-support-modal/contact-support-modal-flow.component"
import useCreateBugTicket, {
  files,
} from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket"
import { ContactSupportFieldValues } from "App/contacts/components/contact-support-modal/contact-support-modal.component"
import { CreateBugTicketResponseStatus } from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket-builder"
import logger from "App/main/utils/logger"

const RecoveryMode: FunctionComponent<{}> = () => {
  const [
    contactSupportOpenState,
    setContactSupportOpenState,
  ] = useState<ContactSupportModalFlowState>()
  const [sendBugTicketRequest, sending] = useCreateBugTicket()

  const openContactSupportModalFlow = () => {
    setContactSupportOpenState(ContactSupportModalFlowState.Form)
  }

  const closeContactSupportModalFlow = () => {
    setContactSupportOpenState(undefined)
  }

  const sendBugTicket = async ({
    email,
    description,
  }: ContactSupportFieldValues) => {
    const response = await sendBugTicketRequest({
      email,
      description,
      subject: `Error - Troubleshooting_XXXX`,
    })
    if (response.status === CreateBugTicketResponseStatus.Ok) {
      setContactSupportOpenState(ContactSupportModalFlowState.Success)
    } else {
      setContactSupportOpenState(ContactSupportModalFlowState.Fail)
      logger.error(`Recovery mode: ${response.error?.message}`)
    }
  }

  return (
    <>
      {contactSupportOpenState && (
        <ContactSupportModalFlow
          openState={contactSupportOpenState}
          files={files}
          onSubmit={sendBugTicket}
          sending={sending}
          closeModal={closeContactSupportModalFlow}
        />
      )}
      <RecoveryModeUI
        onBackupClick={noop}
        onRebootOsClick={noop}
        onRestoreClick={noop}
        onFactoryResetClick={noop}
        onSupportButtonClick={openContactSupportModalFlow}
      />
    </>
  )
}

export default RecoveryMode
