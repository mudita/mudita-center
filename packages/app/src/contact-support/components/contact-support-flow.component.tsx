/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactSupportModal from "App/contact-support/components/contact-support-modal.component"
import ContactSupportModalSuccess from "App/contact-support/components/contact-support-modal-success.component"
import ContactSupportModalError from "App/contact-support/components/contact-support-modal-error.component"
import { ContactSupportFlowTestIds } from "App/contact-support/components/contact-support-flow-test-ids.component"
import { SendTicketState } from "App/contact-support/reducers"
import { SendTicketPayload } from "App/contact-support/actions/send-ticket.action"

interface Props
  extends Pick<
    ComponentProps<typeof ContactSupportModal>,
    "files" | "closeModal"
  > {
  state: SendTicketState | null
  sendTicket: (payload: SendTicketPayload) => void
}

const ContactSupportFlow: FunctionComponent<Props> = ({
  state,
  files,
  sendTicket,
  closeModal,
}) => {
  return (
    <>
      <ContactSupportModal
        testId={ContactSupportFlowTestIds.ContactSupportModal}
        open={state === null || SendTicketState.Sending === state}
        closeModal={closeModal}
        onSubmit={sendTicket}
        sending={SendTicketState.Sending === state}
        files={files}
      />
      <ContactSupportModalSuccess
        testId={ContactSupportFlowTestIds.ContactSupportModalSuccess}
        open={SendTicketState.Success === state}
        closeModal={closeModal}
      />
      <ContactSupportModalError
        testId={ContactSupportFlowTestIds.ContactSupportModalError}
        open={SendTicketState.Error === state}
        closeModal={closeModal}
      />
    </>
  )
}

export default ContactSupportFlow
