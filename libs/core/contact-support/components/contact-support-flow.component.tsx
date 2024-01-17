/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ContactSupportModal from "Core/contact-support/components/contact-support-modal.component"
import ContactSupportModalSuccess from "Core/contact-support/components/contact-support-modal-success.component"
import ContactSupportModalError from "Core/contact-support/components/contact-support-modal-error.component"
import { ContactSupportFlowTestIds } from "Core/contact-support/components/contact-support-flow-test-ids.component"
import { SendTicketState } from "Core/contact-support/reducers"
import { SendTicketPayload } from "Core/contact-support/actions/send-ticket.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

interface Props
  extends Pick<ComponentProps<typeof ContactSupportModal>, "files"> {
  state: SendTicketState | null
  sendTicket: (payload: SendTicketPayload) => void
  closeContactSupportFlow: () => void
  layer?: ModalLayers
}

const ContactSupportFlow: FunctionComponent<Props> = ({
  state,
  files,
  sendTicket,
  closeContactSupportFlow,
  layer = ModalLayers.ContactSupport,
}) => {
  return (
    <>
      <ContactSupportModal
        layer={layer}
        testId={ContactSupportFlowTestIds.ContactSupportModal}
        open={state === null || SendTicketState.Sending === state}
        closeModal={closeContactSupportFlow}
        onSubmit={sendTicket}
        sending={SendTicketState.Sending === state}
        files={files}
      />
      <ContactSupportModalSuccess
        layer={layer}
        testId={ContactSupportFlowTestIds.ContactSupportModalSuccess}
        open={SendTicketState.Success === state}
        closeModal={closeContactSupportFlow}
      />
      <ContactSupportModalError
        testId={ContactSupportFlowTestIds.ContactSupportModalError}
        open={SendTicketState.Error === state}
        closeModal={closeContactSupportFlow}
      />
    </>
  )
}

export default ContactSupportFlow
