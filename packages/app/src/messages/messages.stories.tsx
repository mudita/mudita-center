import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import AttachContactModal from "App/messages/components/attach-contact-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import { ContactCategory } from "App/contacts/store/contacts.interface"
import { Contact } from "App/contacts/store/contacts.type"

export const attachContactFlatListData: Contact[] = [
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    primaryPhoneNumber: "+62761294266",
    email: "Oswald_Bednar1@hotmail.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "63cd8522-f4eb-4bdd-a916-a6d5647e89f9",
    lastName: "Abernathy",
    primaryPhoneNumber: "+78722986805",
    note: "eum",
    blocked: true,
  },
  {
    id: "990f38dd-1c84-4d23-a8bb-6fcfff42774b",
    firstName: "Sandra",
    lastName: "Zulauf",
    secondaryPhoneNumber: "+01078963511",
    email: "Sandra44@gmail.com",
    note: "sequi sunt nisi",
    firstAddressLine: "09136 Linda Spring",
  },
]
export const attachContactListData: ContactCategory[] = [
  {
    category: "Favorites",
    contacts: [
      {
        id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
        firstName: "Oswald",
        lastName: "Bednar",
        primaryPhoneNumber: "+62761294266",
        email: "Oswald_Bednar1@hotmail.com",
        note: "cum aut voluptatem sunt",
        favourite: true,
        firstAddressLine: "30177 Altenwerth Trace",
        secondAddressLine: "East Percivalberg",
      },
    ],
  },
  {
    category: "A",
    contacts: [
      {
        id: "63cd8522-f4eb-4bdd-a916-a6d5647e89f9",
        lastName: "Abernathy",
        primaryPhoneNumber: "+78722986805",
        note: "eum",
        blocked: true,
      },
    ],
  },
  {
    category: "Z",
    contacts: [
      {
        id: "990f38dd-1c84-4d23-a8bb-6fcfff42774b",
        firstName: "Sandra",
        lastName: "Zulauf",
        secondaryPhoneNumber: "+01078963511",
        email: "Sandra44@gmail.com",
        note: "sequi sunt nisi",
        firstAddressLine: "09136 Linda Spring",
      },
    ],
  },
]
storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages
      language={"en"}
      list={rowsMessages}
      searchValue={""}
      attachContactList={attachContactListData}
      attachContactFlatList={attachContactFlatListData}
    />
  </div>
))

storiesOf("Views|Messages/Modals", module)
  .add("Attach contact", () => {
    return (
      <div style={{ maxWidth: "97.5rem" }}>
        <ModalWrapper>
          <AttachContactModal
            contactList={attachContactListData}
            contactFlatList={attachContactFlatListData}
          />
        </ModalWrapper>
        <ModalBackdrop />
      </div>
    )
  })
  .add("Attach contact - empty list", () => {
    return (
      <div style={{ maxWidth: "97.5rem" }}>
        <ModalWrapper>
          <AttachContactModal contactList={[]} contactFlatList={[]} />
        </ModalWrapper>
        <ModalBackdrop />
      </div>
    )
  })
