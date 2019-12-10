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

const ContactCategory = styled(Text)`
  margin: 3rem 0 1.15rem 4rem;
`

const ContactItem = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.4rem;
  padding: 0 3rem 0 4rem;
  background-color: ${backgroundColor("light")};
  border-top: 0.1rem solid ${borderColor("listItem")};
  &:last-child {
    border-bottom: 0.1rem solid ${borderColor("listItem")};
  }

  &:hover {
    background-color: ${backgroundColor("primaryDark")};
    cursor: pointer;
  }
`

const ContactList: FunctionComponent<InitialContactList> = ({
  contactList,
}) => {
  return (
    <ListWrapper>
      {contactList.map(({ category, contacts }, index) => (
        <React.Fragment key={category}>
          <ContactCategory
            displayStyle={TextDisplayStyle.LargeBoldText}
            element={"li"}
          >
            {category}
          </ContactCategory>
          <ListWrapper key={index}>
            {contacts.map(({ firstName, lastName, phoneNumber, id }) => (
              <ContactItem
                displayStyle={TextDisplayStyle.MediumText}
                element={"li"}
                key={id}
              >
                <p>
                  {firstName} {lastName}
                </p>
                <p>{phoneNumber}</p>
              </ContactItem>
            ))}
          </ListWrapper>
        </React.Fragment>
      ))}
    </ListWrapper>
  )
}

export default ContactList
