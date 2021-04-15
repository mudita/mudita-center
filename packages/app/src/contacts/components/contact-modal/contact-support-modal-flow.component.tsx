import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactModal from "App/contacts/components/contact-modal/contact-modal.component"
import { ContactSupportSuccess } from "App/contacts/components/contact-modal/contact-modal-success.component"
import { ContactSupportFailed } from "App/contacts/components/contact-modal/contact-modal-failed.component"

interface Properties {
  config: Record<string, boolean>
}

const ContactSupportModalFlow: FunctionComponent<Properties> = ({config}) => (
  <>
    <ContactModal open={config.contactModal}/>
    <ContactSupportSuccess open={config.successModal} />
    <ContactSupportFailed open={config.failModal}/>
  </>
)

export default ContactSupportModalFlow
