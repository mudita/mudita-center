import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
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
  return (
    <ContactListWrapper>
      {contactList.map(({ letter, contacts }, index) => (
        <React.Fragment key={letter}>
          <Text displayStyle={TextDisplayStyle.LargeBoldText}>{letter}</Text>
          <ContactListWrapper key={index}>
            {contacts.map(({ firstName, lastName, phoneNumber, id }) => (
              <li key={id}>
                {firstName} {lastName} {phoneNumber}
              </li>
            ))}
          </ContactListWrapper>
        </React.Fragment>
      ))}
    </ContactListWrapper>
  )
}

export default ContactList
