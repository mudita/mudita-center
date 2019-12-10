import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { InitialContactList } from "Renderer/models/phone/phone.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ListWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const ContactListWrapper = styled(ListWrapper)`
  background-color: ${backgroundColor("light")};
`

const ContactCategory = styled(Text)`
  margin: 3rem 0 0 4rem;
`

const ContactItem = styled(Text)`
  display: flex;
  align-items: center;
  height: 6.4rem;
  padding: 0 3rem 0 4rem;
  border-top: 0.1rem solid ${borderColor("listItem")};
  &:last-child {
    border-bottom: 0.1rem solid ${borderColor("listItem")};
  }
`

const ContactList: FunctionComponent<InitialContactList> = ({
  contactList,
}) => {
  return (
    <ListWrapper>
      {contactList.map(({ letter, contacts }, index) => (
        <React.Fragment key={letter}>
          <ContactCategory
            displayStyle={TextDisplayStyle.LargeBoldText}
            element={"li"}
          >
            {letter}
          </ContactCategory>
          <ContactListWrapper key={index}>
            {contacts.map(({ firstName, lastName, phoneNumber, id }) => (
              <ContactItem
                displayStyle={TextDisplayStyle.MediumText}
                element={"li"}
                key={id}
              >
                {firstName} {lastName} {phoneNumber}
              </ContactItem>
            ))}
          </ContactListWrapper>
        </React.Fragment>
      ))}
    </ListWrapper>
  )
}

export default ContactList
