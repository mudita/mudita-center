import React from "react"
import { storiesOf } from "@storybook/react"
import Phone from "Renderer/modules/phone/phone.component"
import { action } from "@storybook/addon-actions"
import {
  generateFakeData,
  generateSortedStructure,
} from "Renderer/models/phone/utils/utils"
import styled from "styled-components"
import ContactDetails from "Renderer/modules/phone/components/contact-details.component"
import { Contact } from "Renderer/models/phone/phone.interface"

const contactList = generateSortedStructure(generateFakeData(40))

const PhoneWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

storiesOf("Views|Phone", module).add("Phone", () => (
  <PhoneWrapper>
    <Phone
      contactList={contactList}
      onSearchTermChange={action("Search")}
      onManageButtonClick={action("Manage contact")}
      onNewButtonClick={action("New contact")}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onSelect={action("Selected contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
    />
  </PhoneWrapper>
))

const singleContact = ({
  favourite = false,
  blocked = false,
  speedDial,
}: Partial<Contact> = {}) => ({
  id: "107c8787-31a8-4499-ab43-776640fd3ca7",
  firstName: "Belle",
  lastName: "Krajcik",
  phoneNumbers: ["+40 211 456 285", "+37 030 922 283"],
  email: "BelleK38@gmail.com",
  note:
    "Et ut debitis veritatis dolorum. Facilis magni sit voluptas consequatur est libero quam.",
  address: "50856 Mabelle Motorway",
  favourite,
  blocked,
  speedDial,
})

storiesOf("Views|Phone/Show contact details", module)
  .add("Default", () => (
    <ContactDetails
      contact={singleContact()}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))
  .add("Favourite, speed dial", () => (
    <ContactDetails
      contact={singleContact({ favourite: true, speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))
  .add("Favourite only", () => (
    <ContactDetails
      contact={singleContact({ favourite: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))
  .add("Speed dial only", () => (
    <ContactDetails
      contact={singleContact({ speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))
  .add("Blocked", () => (
    <ContactDetails
      contact={singleContact({ blocked: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))
