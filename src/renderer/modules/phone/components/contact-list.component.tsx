import React from "react"
import { InitialContactList } from "Renderer/models/phone/phone.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ContactListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ContactList: FunctionComponent<InitialContactList> = ({
  contactList,
}) => {
  console.log(contactList)
  return (
    <section>
      <ContactListWrapper>
        {contactList.map(({ letter, contacts }) => (
          <>
            <li key={letter}>{letter}</li>
            <ContactListWrapper>
              {contacts.map(({ firstName, lastName, phoneNumber, id }) => (
                <li key={id}>
                  {firstName} {lastName} {phoneNumber}
                </li>
              ))}
            </ContactListWrapper>
          </>
        ))}
      </ContactListWrapper>
    </section>
  )
}

export default ContactList
