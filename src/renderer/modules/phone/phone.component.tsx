import React from "react"
import { Contacts } from "Renderer/models/phone/phone.interface"
import ContactList from "Renderer/modules/phone/components/contact-list.component"
import ContactPanel from "Renderer/modules/phone/components/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ContactSection = styled.section`
  height: 100%;
  background-color: ${backgroundColor("primaryDark")};
`

interface PhoneProps extends Contacts {
  onSearchTermChange: (event: string) => void
}

const Phone: FunctionComponent<PhoneProps> = ({
  onSearchTermChange,
  contactList,
}) => {
  return (
    <ContactSection>
      <ContactPanel onSearchTermChange={onSearchTermChange} />
      <ContactList contactList={contactList} />
    </ContactSection>
  )
}

export default Phone
