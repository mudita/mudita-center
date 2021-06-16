/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactModal, {
  SupportFormData,
} from "App/contacts/components/contact-modal/contact-modal.component"
import ContactModalSuccess from "App/contacts/components/contact-modal/contact-modal-success.component"
import ContactModalFailed from "App/contacts/components/contact-modal/contact-modal-failed.component"

export enum ContactModalFlowState {
  Contact = "contact",
  Success = "success",
  Fail = "fail",
}

interface Properties {
  config: Record<ContactModalFlowState, boolean>
  sendForm: (formData: SupportFormData) => Promise<void>
  sending?: boolean
  log?: string
  closeSuccessModal: () => void
  closeFailModal: () => void
  closeContactModal: () => void
}

const ContactModalFlow: FunctionComponent<Properties> = ({
  config,
  sendForm,
  sending,
  log,
  closeSuccessModal,
  closeFailModal,
  closeContactModal,
}) => {
  return (
    <>
      <ContactModal
        open={config[ContactModalFlowState.Contact]}
        closeModal={closeContactModal}
        onSend={sendForm}
        sending={sending}
        log={log}
      />
      <ContactModalSuccess
        open={config[ContactModalFlowState.Success]}
        closeModal={closeSuccessModal}
      />
      <ContactModalFailed
        open={config[ContactModalFlowState.Fail]}
        closeModal={closeFailModal}
      />
    </>
  )
}

export default ContactModalFlow
