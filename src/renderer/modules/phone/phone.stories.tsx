import React from "react"
import { storiesOf } from "@storybook/react"
import Phone from "Renderer/modules/phone/phone.component"
import { action } from "@storybook/addon-actions"
import {
  generateFakeData,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import styled from "styled-components"
import ContactDetails from "Renderer/components/rest/phone/contact-details.component"
import { Contact } from "Renderer/models/phone/phone.interface"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import DeleteContactModal from "Renderer/components/rest/phone/delete-contact-modal.component"

const contactList = generateFakeData(40)
const labeledContactList = generateSortedStructure(contactList)

const PhoneWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

storiesOf("Views|Phone", module).add("Phone", () => (
  <PhoneWrapper>
    <Phone
      contactList={labeledContactList}
      onSearchTermChange={action("Search")}
      onManageButtonClick={action("Manage contact")}
      onNewButtonClick={action("New contact")}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onSpeedDialSettingsSave={action("Save speed dial settings")}
    />
  </PhoneWrapper>
))

const singleContact = ({
  favourite = false,
  blocked = false,
  speedDial,
}: Partial<Contact> = {}) => ({
  ...defaultContact,
  id: "107c8787-31a8-4499-ab43-776640fd3ca7",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "+40 211 456 285",
  secondaryPhoneNumber: "+37 030 922 283",
  email: "jondoe@gmail.com",
  note: "Lorem ipsum dolor sit amet.",
  firstAddressLine: "50856 Mabelle Motorway",
  secondAddressLine: "USA",
  favourite,
  blocked,
  speedDial,
  ice: true,
})

storiesOf("Views|Phone/Contact details/Existing", module)
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

storiesOf("Views|Phone/Contact details/Edit", module).add("Default", () => (
  <ContactEdit
    contact={singleContact()}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Contact details/New", module).add("Default", () => (
  <ContactEdit
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Modals", module)
  .add("Speed dial settings", () => (
    <>
      <ModalWrapper>
        <SpeedDialModal
          contacts={labeledContactList}
          onSave={action("Save")}
          onClose={action("Close")}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
  .add("Delete contact", () => (
    <>
      <ModalWrapper>
        <DeleteContactModal
          contact={contactList[0]}
          onDelete={action("Delete")}
          onClose={action("Close")}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
