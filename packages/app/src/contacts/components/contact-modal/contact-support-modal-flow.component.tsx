import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactModal, {
  SupportFormData,
} from "App/contacts/components/contact-modal/contact-modal.component"
import { ContactSupportSuccess } from "App/contacts/components/contact-modal/contact-modal-success.component"
import { ContactSupportFailed } from "App/contacts/components/contact-modal/contact-modal-failed.component"

interface Properties {
  config: Record<string, boolean>
  sendForm: (formData: SupportFormData) => Promise<void>
  sending?: boolean
  log?: string
  closeModal: (payload: any) => void
}

const ContactSupportModalFlow: FunctionComponent<Properties> = ({
  config,
  sendForm,
  sending,
  log,
  closeModal,
}) => {
  const closeSuccessModal = () => {
    closeModal({
      successModal: false
    })
  }
  return (
    <>
      <ContactModal
        open={config.contactModal}
        onSend={sendForm}
        sending={sending}
        log={log}
      />
      <ContactSupportSuccess open={config.successModal} closeModal={closeSuccessModal} />
      <ContactSupportFailed open={config.failModal} />
    </>
  )
}

export default ContactSupportModalFlow
