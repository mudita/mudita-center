import React from "react"
import { InitialContactList } from "Renderer/models/phone/phone.interface"
import ContactList from "Renderer/modules/phone/components/contact-list.component"
import FunctionComponent from "Renderer/types/function-component.interface"

const Phone: FunctionComponent<InitialContactList> = ({ contactList }) => {
  return (
    <div>
      <input type="text" />
      <ContactList contactList={contactList} />
    </div>
  )
}

export default Phone
