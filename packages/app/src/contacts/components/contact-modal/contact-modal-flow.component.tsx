/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactModal, {
  SupportFormData,
} from "App/contacts/components/contact-modal/contact-modal.component"
import { ContactSupportSuccess } from "App/contacts/components/contact-modal/contact-modal-success.component"
import { ContactSupportFailed } from "App/contacts/components/contact-modal/contact-modal-failed.component"
import { ContactSupportModalKind } from "Renderer/utils/contact-support/use-contact-support"

interface Properties {
  config: Record<ContactSupportModalKind, boolean>
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
        open={config[ContactSupportModalKind.Contact]}
        closeModal={closeContactModal}
        onSend={sendForm}
        sending={sending}
        log={log}
      />
      <ContactSupportSuccess
        open={config[ContactSupportModalKind.Success]}
        closeModal={closeSuccessModal}
      />
      <ContactSupportFailed
        open={config[ContactSupportModalKind.Fail]}
        closeModal={closeFailModal}
      />
    </>
  )
}

export default ContactModalFlow
