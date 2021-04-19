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
}

const ContactSupportModalFlow: FunctionComponent<Properties> = ({
  config,
  sendForm,
  sending,
  log,
}) => (
  <>
    <ContactModal
      open={config.contactModal}
      onSend={sendForm}
      sending={sending}
      log={log}
    />
    <ContactSupportSuccess open={config.successModal} />
    <ContactSupportFailed open={config.failModal} />
  </>
)

export default ContactSupportModalFlow
