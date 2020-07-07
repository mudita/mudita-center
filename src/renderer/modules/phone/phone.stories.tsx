import React from "react"
import { storiesOf } from "@storybook/react"
import Phone, { PhoneProps } from "Renderer/modules/phone/phone.component"
import { action } from "@storybook/addon-actions"
import {
  createFullName,
  generateFakeData,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import styled from "styled-components"
import ContactDetails from "Renderer/components/rest/phone/contact-details.component"
import { Contact, ResultsState } from "Renderer/models/phone/phone.interface"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import Faker from "faker"
import DeleteModal from "App/renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"

const contacts: Contact[] = generateFakeData(40)

contacts.push(
  {
    id: "id1",
    firstName: "Ędward",
    lastName: "Ącki",
    primaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
    secondaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
    email: Faker.internet.email("Ędward", "Ącki"),
    note: Faker.lorem.words(Math.random() * 4),
    ice: Math.random() < 0.2,
    favourite: true,
    blocked: false,
    speedDial: undefined,
    firstAddressLine: Faker.address.streetAddress(),
    secondAddressLine: Faker.address.city(),
  },
  {
    id: "id2",
    firstName: ".Info",
    lastName: "",
    primaryPhoneNumber: "*121#",
    secondaryPhoneNumber: "",
    email: "",
    note: "Account billing",
    ice: false,
    favourite: false,
    blocked: false,
    speedDial: undefined,
    firstAddressLine: "",
    secondAddressLine: "",
  }
)

const labeledContactList = generateSortedStructure(contacts)

const PhoneWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

const PhoneComponent = ({
  resultsState,
  contactList = labeledContactList,
}: Partial<Pick<PhoneProps, "resultsState" | "contactList">>) => (
  <Phone
    contactList={contactList}
    onSearchTermChange={action("Search")}
    onManageButtonClick={action("Manage contact")}
    onNewButtonClick={action("New contact")}
    onEdit={action("Edit contact")}
    onExport={action("Export contact")}
    onForward={action("Forward contact")}
    onUnblock={action("Unblock contact")}
    onBlock={action("Block contact")}
    onDelete={action("Delete contact")}
    onMessage={action("Send message")}
    onCall={action("Call")}
    onSpeedDialSettingsSave={action("Save speed dial settings")}
    resultsState={resultsState}
  />
)

storiesOf("Views|Phone", module)
  .add("Loading", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loading} />
    </PhoneWrapper>
  ))
  .add("Empty", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Empty} />
    </PhoneWrapper>
  ))
  .add("Loaded", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loaded} />
    </PhoneWrapper>
  ))
  .add("No search results", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loaded} contactList={[]} />
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
      onUnblock={action("Unblock contact")}
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
      onUnblock={action("Unblock contact")}
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
      onUnblock={action("Unblock contact")}
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
      onUnblock={action("Unblock contact")}
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
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
    />
  ))

storiesOf("Views|Phone/Contact details/Edit", module).add("Default", () => (
  <ContactEdit
    availableSpeedDials={[3, 4, 6, 7, 8]}
    contact={singleContact()}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Contact details/New", module).add("Default", () => (
  <ContactEdit
    availableSpeedDials={[3, 4, 6, 7, 8]}
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
        <DeleteModal
          title={intl.formatMessage({
            id: "view.name.phone.contacts.modal.delete.title",
          })}
          text={intl.formatMessage(
            {
              id: "view.name.phone.contacts.modal.delete.text",
            },
            { name: createFullName(singleContact()), ...textFormatters }
          )}
          onDelete={action("Delete")}
          onClose={action("Close")}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
