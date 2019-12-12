import React from "react"
import { InitialContactList } from "Renderer/models/phone/phone.interface"
import ContactList from "Renderer/modules/phone/components/contact-list.component"
import ContactPanel from "Renderer/modules/phone/components/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ContactSection = styled.section`
  height: 100%;
  background-color: ${backgroundColor("primaryDark")};
`

interface PhoneProps extends InitialContactList {
  handleInput: (event: string) => string
}

const Phone: FunctionComponent<PhoneProps> = ({ handleInput, grouped }) => {
  return (
    <ContactSection>
      <ContactPanel handleInput={handleInput} />
      <ContactList contactList={grouped} />
    </ContactSection>
  )
}

export default Phone
